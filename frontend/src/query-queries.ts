import { gql } from "@apollo/client";

export const GET_USER = gql`
    query GetUser($id: ID!) {
        user(id: $id)
    }`;

export const GET_LINK_QUERY = gql`
    query GetLink($id: String!) {
        getLink(id: $id) {
            id
            userId
        }}`;

export const GET_FORGET_CODE_QUERY = gql`
query GetForgetCode($id: String!) {
    getCode(id: $id){
        id
        userId
        code
    }}`;

export const SEARCH_QUERY = gql`
query Search($keyword: String!, $limit: Int!, $offset: Int!){
    search(keyword: $keyword, limit: $limit, offset: $offset)
    }`;

export const USER_YOU_MIGHT_KNOW_QUERY = gql`
    query UserYouMightKnow($id: ID!){
        userYouMightKnow(id: $id)
    }`;

export const GENERATE_ID = gql`
    query GenerateID{
        generateID
    }`;

export const GET_POSTS = gql`
    query GetPosts($id: ID!, $limit: Int!, $offset: Int!) {
        getPosts(id: $id, limit: $limit, offset: $offset)
    }`;

export const GET_COMMENTS = gql`
    query GetComments($postId: ID!){
        getComment(postId: $postId)
    }`;