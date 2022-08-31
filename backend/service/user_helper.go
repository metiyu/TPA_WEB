package service

import (
	"crypto/rand"
	"io"
	"sort"

	"github.com/metiyu/gqlgen-linkhedin/graph/model"
)

var table = [...]byte{'1', '2', '3', '4', '5', '6', '7', '8', '9', '0'}

func EncodeToString(max int) string {
	b := make([]byte, max)
	n, err := io.ReadAtLeast(rand.Reader, b, max)
	if n != max {
		panic(err)
	}
	for i := 0; i < len(b); i++ {
		b[i] = table[int(b[i])%len(table)]
	}
	return string(b)
}

func RemoveElementFromArray(model []string, toSearch string) []string {
	index := sort.StringSlice(model).Search(toSearch)
	model[index] = model[len(model)-1]
	model[len(model)-1] = ""
	model = model[:len(model)-1]
	return model
}

func contains(users []*model.User, user *model.User) bool {
	for _, v := range users {
		if v.ID == user.ID {
			return true
		}
	}
	return false
}
