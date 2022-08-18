package auth

import (
	"context"

	"github.com/google/uuid"
	"github.com/metiyu/gqlgen-linkhedin/database"
	"github.com/metiyu/gqlgen-linkhedin/graph/model"
)

func CreateUser(ctx context.Context, newUser model.NewUser) (*model.User, error) {
	db := database.GetDB()
	newUser.Password = HashPassword(newUser.Password)
	var emptyArrString []string
	user := model.User{
		ID:             uuid.NewString(),
		Name:           newUser.Name,
		Email:          newUser.Email,
		Password:       newUser.Password,
		Validate:       false,
		PhotoProfile:   "https://picsum.photos/id/237/200/300",
		RequestConnect: emptyArrString,
		FollowedUser:   emptyArrString,
		ConnectedUser:  emptyArrString,
	}
	if err := db.Model(user).Create(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func UserGetByID(ctx context.Context, id string) (*model.User, error) {
	db := database.GetDB()
	var user model.User
	if err := db.Model(user).Where("id = ?", id).Take(&user).Error; err != nil {
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
