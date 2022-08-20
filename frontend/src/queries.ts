import { gql } from "@apollo/client";

export const REGISTER_QUERY = gql`
    mutation Register($input: NewUser!) {
        register(input: $input)
    }`;

export const LOGIN_QUERY = gql`
    mutation Login($email: String!, $password: String!){
        login(email: $email, password: $password)
    }`;

export const UPDATE_USER = gql`
    mutation UpdateUser($id: String!, $name: String!, $work: String!, $education: String!, $region: String!, $profileURL: String!, $backgroundURL: String!) {
    updateUser(
        id: $id
        name: $name
        work: $work
        education: $education
        region: $region
        profileURL: $profileURL
        backgroundURL: $backgroundURL
    )}`;

export const GET_LINK_QUERY = gql`
    query GetLink($id: String!) {
        getLink(id: $id) {
            id
            userId
        }}`;

export const ACTIVATE_ACC_QUERY = gql`
    mutation ActivateUser($id: ID!){
        activateUser(id: $id)
    }`;

export const GET_FORGET_CODE_QUERY = gql`
    query GetForgetCode($id: String!) {
        getCode(id: $id){
            id
            userId
            code
        }}`;

export const FORGET_CODE_QUERY = gql`
    mutation ForgetCode($email: String!) {
        createCode(email: $email){
            id
            userId
            code
        }}`;

export const RESET_PASSWORD_QUERY = gql`
    mutation ResetPassword($id: ID!, $newPass: String!) {
        resetPassword(id: $id, newPass: $newPass)
    }`