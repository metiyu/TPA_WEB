import { gql } from "@apollo/client";

export const REGISTER_QUERY = gql`
    mutation Register($input: NewUser!) {
        register(input: $input)
    }`;

export const REGISTER_BY_GOOGLE_QUERY = gql`
    mutation RegisterByGoogle($email: String!, $email_verified: Boolean!, $name: String!, $id: String!, $picture: String!){
        registerByGoogle(email: $email, email_verified: $email_verified, name: $name, id: $id, picture: $picture)
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
    mutation SendConnect($id: ID!, $requestedId: ID!,  $message: String) {
        sendConnectRequest(id: $id, requestedId: $requestedId, message: $message)
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

export const CREATE_POST_QUERY = gql`
    mutation CreatePost($id:ID!, $userId: ID!,  $caption: String!, $photo_url: String, $video_url: String){
        createPost(id: $id, userId: $userId, caption: $caption, photo_url: $photo_url, video_url: $video_url)
    }`;

export const LIKE_POST = gql`
    mutation LikePost($id: ID!, $likerId: ID!) {
        likePost(id: $id, likerId: $likerId)
    }`;

export const UNLIKE_POST = gql`
    mutation UnlikePost($id: ID!, $unlikerId: ID!) {
        unlikePost(id: $id, unlikerId: $unlikerId)
    }`;

export const COMMENT_POST = gql`
    mutation CommentPost($postId: ID!, $commenterId: ID!, $comment: String!) {
        commentPost(postId: $postId, commenterId: $commenterId, comment: $comment)
    }`;

export const LIKE_COMMENT = gql`
    mutation LikeCommentPost($commentId: ID!, $likerId: ID!){
        likeComment(commentId: $commentId, likerId: $likerId)
    }`;

export const UNLIKE_COMMENT = gql`
    mutation UnlikeCommentPost($commentId: ID!, $unlikerId: ID!){
        unlikeComment(commentId: $commentId, unlikerId: $unlikerId)
    }`;

export const VIEW_PROFILE = gql`
    mutation ViewProfile($id: ID!, $userProfileId: ID!){
        viewUserProfile(id: $id, userProfileId: $userProfileId)
    }`;

export const CREATE_JOBS_QUERY = gql`
mutation CreateJobs($creatorId: ID!, $position: String!, $company: String!, $location: String!) {
    createJobs(
        creatorId: $creatorId
        position: $position
        company: $company
        location: $location
    )}`;