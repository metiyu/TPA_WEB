import { gql } from "@apollo/client";

export const REGISTER_QUERY = gql`
    mutation Register($input: NewUser!) {
        register(input: $input)
    }`;

export const LOGIN_QUERY = gql`
    mutation Login($email: String!, $password: String!){
        login(email: $email, password: $password)
    }`;