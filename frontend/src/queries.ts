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