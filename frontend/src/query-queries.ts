import { gql } from "@apollo/client";

export const GET_USER = gql`
    query GetUser($id: ID!) {
        user(id: $id)
    }`;

export const GET_USER_BY_EMAIL = gql`
    query GetUserByEmail($email: String!) {
        getUserByEmail(email: $email)
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

export const SEARCH_CONNECTED_USER_QUERY = gql`
    query SearchConnectedUser($id: ID!, $keyword: String!) {
        searchConnectedUser(id: $id, keyword: $keyword)
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

export const GET_POST_BY_ID = gql`
    query GetPostById($id: ID!) {
        getPostById(id: $id)
    }`;

export const GET_COMMENTS = gql`
    query GetComments($postId: ID!, $offset: Int!, $limit: Int!) {
        getComment(postId: $postId, offset: $offset, limit: $limit)
    }`;

export const GET_COMMENT_BY_ID = gql`
    query GetCommentByID($id: ID!){
        getCommentById(id: $id)
    }`;

export const GET_JOBS = gql`
    query GetJobs {
        getJobs
    }`;

export const GET_EDUCATION = gql`
    query GetEducation($id: ID!){
        getEducation(id: $id)
    }`;

export const GET_EXPERIENCE = gql`
    query GetExperience($id: ID!){
        getExperience(id: $id)
    }`;