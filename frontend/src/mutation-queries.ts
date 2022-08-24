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

export const ACTIVATE_ACC_QUERY = gql`
    mutation ActivateUser($id: ID!){
        activateUser(id: $id)
    }`;

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
    }`;

export const SEND_CONNECT_QUERY = gql`
    mutation SendConnect($id: ID!, $requestedId: ID!){
        sendConnectRequest(id: $id, requestedId: $requestedId)
    }`;

export const ACCEPT_CONNECT_QUERY = gql`
    mutation AcceptConnectReq($id: ID!, $acceptedId: ID!){
    acceptConnectRequest(id: $id, acceptedId: $acceptedId)
    }`;

export const IGNORE_CONNECT_QUERY = gql`
    mutation IgnoreConnectReq($id: ID!, $ignoredId: ID!){
        ignoreConnectRequest(id: $id, ignoredId: $ignoredId)
    }`;

export const UNCONNECT_USER_QUERY = gql`
    mutation UnconnectUser($id: ID!, $unconnectedId: ID!){
        unconnectUser(id: $id, unconnectedId: $unconnectedId)
    }`;

export const FOLLOW_USER_QUERY = gql`
    mutation FollowUser($id: ID!, $followedId: ID!){
        followUser(id: $id, followedId: $followedId)
    }`;

export const UNFOLLOW_USER_QUERY = gql`
    mutation UnfollowUser($id: ID!, $unfollowedId: ID!){
        unfollowUser(id: $id, unfollowedId: $unfollowedId)
    }`;