package service

import (
	"context"
	"errors"
	"strings"

	"github.com/google/uuid"
	"github.com/metiyu/gqlgen-linkhedin/config"
	"github.com/metiyu/gqlgen-linkhedin/graph/model"
	"github.com/metiyu/gqlgen-linkhedin/tools"
)

func CreateUser(ctx context.Context, newUser model.NewUser) (*model.User, error) {
	db := database.GetDB()
	newUser.Password = tools.HashPassword(newUser.Password)
	var emptyArrString []string
	user := model.User{
		ID:             uuid.NewString(),
		Name:           newUser.Name,
		Email:          strings.ToLower(newUser.Email),
		Password:       newUser.Password,
		Validate:       true,
		Work:           "",
		Region:         "",
		PhotoProfile:   "https://e7.pngegg.com/pngimages/753/432/png-clipart-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service.png",
		RequestConnect: emptyArrString,
		FollowedUser:   emptyArrString,
		ConnectedUser:  emptyArrString,
		PendingRequest: emptyArrString,
		ProfileViewer:  emptyArrString,
	}
	if err := db.Model(user).Create(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func CreateUserByGoogle(ctx context.Context, email string, email_verified bool, name string, id string, picture string) (*model.User, error) {
	db := database.GetDB()
	var emptyArrString []string
	user := model.User{
		ID:             id,
		Name:           name,
		Email:          strings.ToLower(email),
		Password:       "",
		Validate:       true,
		Work:           "",
		Region:         "",
		PhotoProfile:   picture,
		RequestConnect: emptyArrString,
		FollowedUser:   emptyArrString,
		ConnectedUser:  emptyArrString,
		PendingRequest: emptyArrString,
		ProfileViewer:  emptyArrString,
	}
	if err := db.Model(user).Create(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func UserGetByID(ctx context.Context, id string) (*model.User, error) {
	db := database.GetDB()
	var user model.User
	err := db.Model(user).Where("id = ?", id).Take(&user).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func GetUserByEmail(ctx context.Context, email string) (*model.User, error) {
	db := database.GetDB()
	var user model.User
	err := db.Model(user).Where("email LIKE ?", email).Take(&user).Error
	if err != nil {
		return nil, err
	}
	return &user, err
}

func UpdateUser(ctx context.Context, id string, name string, work string, education string, region string, profileURL string, backgroundURL string) (interface{}, error) {
	model := new(model.User)
	db := database.GetDB()
	err := db.First(model, "id = ?", id).Error
	if err != nil {
		return nil, err
	}
	token, err := JwtGenerate(ctx, id)
	if err != nil {
		return nil, err
	}
	model.Name = name
	model.Work = work
	model.Education = education
	model.Region = region
	model.PhotoProfile = profileURL
	model.BackgroundPhoto = backgroundURL

	return map[string]interface{}{
		"id":               model.ID,
		"name":             model.Name,
		"email":            model.Email,
		"validate":         model.Validate,
		"work":             model.Work,
		"education":        model.Education,
		"region":           model.Region,
		"followed_user":    model.FollowedUser,
		"pending_request":  model.RequestConnect,
		"request_connect":  model.RequestConnect,
		"connected_user":   model.ConnectedUser,
		"profile_viewer":   model.ProfileViewer,
		"photo_profile":    model.PhotoProfile,
		"photo_background": model.BackgroundPhoto,
		"token":            token,
	}, db.Where("id = ?", id).Save(model).Error
	// return model, token, db.Where("id = ?", id).Save(model).Error
}

func ActivateUser(ctx context.Context, id string) (interface{}, error) {
	model := new(model.User)
	db := database.GetDB()
	err := db.First(model, "id = ?", id).Error
	if err != nil {
		return nil, err
	}
	isActive := model.Validate
	if !isActive {
		model.Validate = true
	}
	return model, db.Where("id = ?", id).Save(model).Error
}

func ResetPassword(ctx context.Context, id string, newPass string) (interface{}, error) {
	model, err := UserGetByID(ctx, id)
	if err != nil {
		return nil, err
	}
	db := database.GetDB()
	if err := db.First(model, "id = ?", id).Error; err != nil {
		return nil, err
	}
	if !model.Validate {
		return nil, errors.New("your account is not authenticated")
	}
	model.Password = tools.HashPassword(newPass)
	return model, db.Where("id = ?", id).Save(model).Error
}

func GetUsersByName(ctx context.Context, name string, limit int, offset int) ([]*model.User, error) {
	db := database.GetDB()
	if name == "" {
		name = "%"
	}

	var users []*model.User
	if err := db.Limit(limit).Offset(offset).Find(&users, "LOWER(name) like ?", "%"+strings.ToLower(name)+"%").Error; err != nil {
		return nil, err
	}
	return users, nil
}

func FollowUser(ctx context.Context, id string, followedId string) (interface{}, error) {
	db := database.GetDB()
	model, err := UserGetByID(ctx, id)
	if err != nil {
		return nil, err
	}
	model.FollowedUser = append(model.FollowedUser, followedId)
	return model, db.Where("id = ?", id).Save(model).Error
}

func UnfollowUser(ctx context.Context, id string, unfollowedId string) (interface{}, error) {
	db := database.GetDB()
	model, err := UserGetByID(ctx, id)
	if err != nil {
		return nil, err
	}
	model.FollowedUser = RemoveElementFromArray(model.FollowedUser, unfollowedId)
	return model, db.Where("id = ?", id).Save(model).Error
}

func SendConnectRequest(ctx context.Context, id string, requestedId string, message string) (interface{}, error) {
	db := database.GetDB()
	userRequested, err := UserGetByID(ctx, requestedId)
	if err != nil {
		return nil, err
	}
	userRequested.RequestConnect = append(userRequested.RequestConnect, id)
	// userRequested.RequestConnectMessage = append(userRequested.RequestConnectMessage, message)
	userNow, err := UserGetByID(ctx, id)
	if err != nil {
		return nil, err
	}
	userNow.PendingRequest = append(userNow.PendingRequest, requestedId)
	db.Where("id = ?", userNow.ID).Save(userNow)
	return map[string]interface{}{
		"userNow":       userNow,
		"userRequested": userRequested,
	}, db.Where("id = ?", requestedId).Save(userRequested).Error
}

func AcceptConnectRequest(ctx context.Context, id string, acceptedId string) (interface{}, error) {
	db := database.GetDB()
	if userNow, err := UserGetByID(ctx, id); err != nil {
		return nil, err
	} else {
		userNow.RequestConnect = RemoveElementFromArray(userNow.RequestConnect, acceptedId)
		// for i, val := range userNow.RequestConnect {
		// 	if val == userNow.ID {
		// 		userNow.RequestConnectMessage = RemoveArrayByIndex(userNow.RequestConnectMessage, i)
		// 		break
		// 	}
		// }
		userNow.ConnectedUser = append(userNow.ConnectedUser, acceptedId)
		if err := db.Where("id = ?", id).Save(userNow).Error; err != nil {
			return nil, err
		} else {
			db.Where("id = ?", id).Save(userNow)
		}
	}
	if userWillAccept, err := UserGetByID(ctx, acceptedId); err != nil {
		return nil, err
	} else {
		userWillAccept.PendingRequest = RemoveElementFromArray(userWillAccept.PendingRequest, id)
		userWillAccept.ConnectedUser = append(userWillAccept.ConnectedUser, id)
		if err := db.Where("id = ?", acceptedId).Save(userWillAccept).Error; err != nil {
			return nil, err
		} else {
			db.Where("id = ?", acceptedId).Save(userWillAccept)
		}
	}
	user, err := UserGetByID(ctx, id)
	return user, err
}

func IgnoreConnectRequest(ctx context.Context, id string, ignoredId string) (interface{}, error) {
	db := database.GetDB()
	if userNow, err := UserGetByID(ctx, id); err != nil {
		return nil, err
	} else {
		userNow.RequestConnect = RemoveElementFromArray(userNow.RequestConnect, ignoredId)
		if err := db.Where("id = ?", id).Save(userNow).Error; err != nil {
			return nil, err
		} else {
			db.Where("id = ?", id).Save(userNow)
		}
	}
	if userWillAccept, err := UserGetByID(ctx, ignoredId); err != nil {
		return nil, err
	} else {
		userWillAccept.PendingRequest = RemoveElementFromArray(userWillAccept.PendingRequest, id)
		if err := db.Where("id = ?", ignoredId).Save(userWillAccept).Error; err != nil {
			return nil, err
		} else {
			db.Where("id = ?", ignoredId).Save(userWillAccept)
		}
	}
	user, err := UserGetByID(ctx, id)
	return user, err
}

func UnconnectUser(ctx context.Context, id string, unconnectedId string) (interface{}, error) {
	db := database.GetDB()
	if userNow, err := UserGetByID(ctx, id); err != nil {
		return nil, err
	} else {
		userNow.ConnectedUser = RemoveElementFromArray(userNow.ConnectedUser, unconnectedId)
		if err := db.Where("id = ?", id).Save(userNow).Error; err != nil {
			return nil, err
		} else {
			db.Where("id = ?", id).Save(userNow)
		}
	}
	if userWillUnconnect, err := UserGetByID(ctx, unconnectedId); err != nil {
		return nil, err
	} else {
		userWillUnconnect.ConnectedUser = RemoveElementFromArray(userWillUnconnect.ConnectedUser, id)
		if err := db.Where("id = ?", unconnectedId).Save(userWillUnconnect).Error; err != nil {
			return nil, err
		} else {
			db.Where("id = ?", unconnectedId).Save(userWillUnconnect)
		}
	}
	user, err := UserGetByID(ctx, id)
	return user, err
}

func UserYouMightKnow(ctx context.Context, id string) (interface{}, error) {
	var users []*model.User
	userNow, err := UserGetByID(ctx, id)
	if err != nil {
		return nil, err
	}
	for i := 0; i < len(userNow.ConnectedUser); i++ {
		userFriends, err := UserGetByID(ctx, userNow.ConnectedUser[i])
		if err != nil {
			return nil, err
		}
		for j := 0; j < len(userFriends.ConnectedUser); j++ {
			if userFriends.ConnectedUser[j] != id {
				userFriends, err := UserGetByID(ctx, userFriends.ConnectedUser[j])
				if err != nil {
					return nil, err
				}
				if !contains(users, userFriends) {
					users = append(users, userFriends)
				}
			}
		}
	}
	return users, nil
}

func ViewUserProfile(ctx context.Context, id string, userProfileId string) (interface{}, error) {
	db := database.GetDB()
	model, err := UserGetByID(ctx, userProfileId)
	if err != nil {
		return nil, err
	}
	if model.ProfileViewer == nil || len(model.ProfileViewer) <= 0 {
		model.ProfileViewer = append(model.ProfileViewer, id)
	} else {
		if !str_contains(model.ProfileViewer, id) {
			model.ProfileViewer = append(model.ProfileViewer, id)
		}
	}
	return model, db.Where("id = ?", userProfileId).Save(model).Error
}

func GetEducationById(ctx context.Context, id string) (*model.Education, error) {
	db := database.GetDB()

	var education model.Education
	if err := db.First(&education, "id = ?", id).Error; err != nil {
		return nil, err
	}

	return &education, nil
}

func CreateEducation(ctx context.Context, userID string, school string, degree string, startDate string, endDate string) (interface{}, error) {
	db := database.GetDB()

	id := uuid.NewString()
	education := model.Education{
		ID:        id,
		School:    school,
		Degree:    degree,
		StartDate: startDate,
		EndDate:   endDate,
	}

	if err := db.Create(&education).Error; err != nil {
		return nil, err
	}

	model, err := UserGetByID(ctx, userID)
	if err != nil {
		return nil, err
	}
	model.Educations = append(model.Educations, id)

	return model, db.Where("id = ?", userID).Save(model).Error
}

func UpdateEducation(ctx context.Context, educationID string, school string, degree string, startDate string, endDate string) (interface{}, error) {
	db := database.GetDB()

	education, err := GetEducationById(ctx, educationID)
	if err != nil {
		return nil, err
	}

	if err := db.Model(&education).Updates(model.Education{
		School:    school,
		Degree:    degree,
		StartDate: startDate,
		EndDate:   endDate,
	}).Error; err != nil {
		return nil, err
	}

	return education, nil
}

func DeleteEducation(ctx context.Context, userID string, educationID string) (interface{}, error) {
	db := database.GetDB()

	model, err := UserGetByID(ctx, userID)
	if err != nil {
		return nil, err
	}
	model.Educations = RemoveElementFromArray(model.Educations, educationID)

	return model, db.Where("id = ?", userID).Save(model).Error
}

func GetExperienceById(ctx context.Context, id string) (*model.Experience, error) {
	db := database.GetDB()

	var experience model.Experience
	if err := db.First(&experience, "id = ?", id).Error; err != nil {
		return nil, err
	}

	return &experience, nil
}

func CreateExperience(ctx context.Context, userID string, title string, employmentType string, companyName string, location string, startDate string, endDate string) (interface{}, error) {
	db := database.GetDB()

	id := uuid.NewString()
	experience := model.Experience{
		ID:             id,
		Title:          title,
		EmploymentType: employmentType,
		CompanyName:    companyName,
		Location:       location,
		StartDate:      startDate,
		EndDate:        endDate,
	}

	if err := db.Create(&experience).Error; err != nil {
		return nil, err
	}

	model, err := UserGetByID(ctx, userID)
	if err != nil {
		return nil, err
	}
	model.Experiences = append(model.Experiences, id)

	return model, db.Where("id = ?", userID).Save(model).Error
}

func UpdateExperience(ctx context.Context, experienceID string, title string, employmentType string, companyName string, location string, startDate string, endDate string) (interface{}, error) {
	db := database.GetDB()

	experience, err := GetExperienceById(ctx, experienceID)
	if err != nil {
		return nil, err
	}

	if err := db.Model(&experience).Updates(model.Experience{
		Title:          title,
		EmploymentType: employmentType,
		CompanyName:    companyName,
		Location:       location,
		StartDate:      startDate,
		EndDate:        endDate,
	}).Error; err != nil {
		return nil, err
	}

	return experience, nil
}

func DeleteExperience(ctx context.Context, userID string, experienceID string) (interface{}, error) {
	db := database.GetDB()
	
	model, err := UserGetByID(ctx, userID)
	if err != nil {
		return nil, err
	}
	model.Experiences = RemoveElementFromArray(model.Experiences, experienceID)

	return model, db.Where("id = ?", userID).Save(model).Error
}
