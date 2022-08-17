import { gql } from "@apollo/client";

const REGISTER_QUERY = gql`
    mutation Register($input: NewUser!) {
        register(input: $input)
    }`;

export default REGISTER_QUERY;