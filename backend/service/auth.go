package service

import (
	"context"
	"errors"

	"github.com/google/uuid"
	database "github.com/metiyu/gqlgen-linkhedin/config"
	"github.com/metiyu/gqlgen-linkhedin/graph/model"
	"github.com/metiyu/gqlgen-linkhedin/tools"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"gorm.io/gorm"
)

func UserRegister(ctx context.Context, newUser model.NewUser) (interface{}, error) {

	_, err := GetUserByEmail(ctx, newUser.Email)

	if err == nil {
		if err != gorm.ErrRecordNotFound {
			return nil, err
		}
	}

	createdUser, err := CreateUser(ctx, newUser)

	if err != nil {
		return nil, err
	}
	token, err := JwtGenerate(ctx, createdUser.ID)
	if err != nil {
		return nil, err
	}

	newId := uuid.NewString()

	verification := &model.ActivationLink{
		ID:     newId,
		Link:   "http://localhost:5173/" + newId,
		UserID: createdUser.ID,
	}

	db := database.GetDB()
	err = db.Create(&verification).Error

	if err != nil {
		return nil, err
	}

	SendEmail(createdUser.Email, verification.Link)

	return map[string]interface{}{
		"token": token,
		"name":  createdUser.Name,
		"email": createdUser.Email,
	}, nil
}

func UserLogin(ctx context.Context, email string, password string) (interface{}, error) {
	user, err := GetUserByEmail(ctx, email)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, &gqlerror.Error{
				Message: "Email Not Found",
			}
		}
		return nil, err
	}

	if !user.Validate {
		return nil, errors.New("your account is not authenticated")
	}

	if err := tools.ComparePassword(user.Password, password); err != nil {
		return nil, err
	}

	token, err := JwtGenerate(ctx, user.ID)
	if err != nil {
		return nil, err
	}

	return map[string]interface{}{
		"id":               user.ID,
		"name":             user.Name,
		"email":            user.Email,
		"validate":         user.Validate,
		"work":             user.Work,
		"education":        user.Education,
		"region":           user.Region,
		"photo_profile":    user.PhotoProfile,
		"photo_background": user.BackgroundPhoto,
		"request_connect":  user.RequestConnect,
		"followed_user":    user.FollowedUser,
		"connected_user":   user.ConnectedUser,
		"token":            token,
	}, nil
}
