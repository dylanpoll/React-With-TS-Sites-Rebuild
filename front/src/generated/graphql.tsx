import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  createProject: Projects;
  deletePost: Scalars['Boolean'];
  deleteProject: Scalars['Boolean'];
  forgotPass: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  updatePost?: Maybe<Post>;
  updateProject?: Maybe<Projects>;
};


export type MutationCreatePostArgs = {
  body: Scalars['String'];
  title: Scalars['String'];
};


export type MutationCreateProjectArgs = {
  body: Scalars['String'];
  title: Scalars['String'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Float'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['Float'];
};


export type MutationLoginArgs = {
  loginType: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationUpdatePostArgs = {
  body: Scalars['String'];
  id: Scalars['Float'];
  title?: Maybe<Scalars['String']>;
};


export type MutationUpdateProjectArgs = {
  body: Scalars['String'];
  id: Scalars['Float'];
  title?: Maybe<Scalars['String']>;
};

export type Post = {
  __typename?: 'Post';
  body: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Projects = {
  __typename?: 'Projects';
  body: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  post?: Maybe<Post>;
  posts: Array<Post>;
  projectbyID?: Maybe<Projects>;
  projects: Array<Projects>;
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryProjectbyIdArgs = {
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Float'];
  password: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UserFragmentFragment = { __typename?: 'User', id: number, username: string, email: string };

export type CreatePostMutationVariables = Exact<{
  body: Scalars['String'];
  title: Scalars['String'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: number, createdAt: string, updatedAt: string, title: string, body: string } };

export type CreateProjectMutationVariables = Exact<{
  body: Scalars['String'];
  title: Scalars['String'];
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Projects', id: number, createdAt: string, updatedAt: string, title: string, body: string } };

export type LoginMutationVariables = Exact<{
  loginType: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: number, username: string, email: string }> } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: number, username: string, email: string }> } };

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['Float'];
  body: Scalars['String'];
  title: Scalars['String'];
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost?: Maybe<{ __typename?: 'Post', id: number, createdAt: string, updatedAt: string, title: string, body: string }> };

export type UpdateProjectMutationVariables = Exact<{
  id: Scalars['Float'];
  body: Scalars['String'];
  title: Scalars['String'];
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject?: Maybe<{ __typename?: 'Projects', id: number, createdAt: string, updatedAt: string, title: string, body: string }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: number, username: string, email: string }> };

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', id: number, createdAt: string, updatedAt: string, title: string, body: string }> };

export type ProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectsQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Projects', id: number, createdAt : string, updatedAt: string, title: string, body: string }> };

export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  id
  username
  email
}
    `;
export const CreatePostDocument = gql`
    mutation createPost($body: String!, $title: String!) {
  createPost(title: $title, body: $body) {
    id
    createdAt
    updatedAt
    title
    body
  }
}
    `;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const CreateProjectDocument = gql`
    mutation createProject($body: String!, $title: String!) {
  createProject(title: $title, body: $body) {
    id
    createdAt
    updatedAt
    title
    body
  }
}
    `;

export function useCreateProjectMutation() {
  return Urql.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument);
};
export const LoginDocument = gql`
    mutation Login($loginType: String!, $password: String!) {
  login(loginType: $loginType, password: $password) {
    errors {
      field
      message
    }
    user {
      ...UserFragment
    }
  }
}
    ${UserFragmentFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    errors {
      field
      message
    }
    user {
      ...UserFragment
    }
  }
}
    ${UserFragmentFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const UpdatePostDocument = gql`
    mutation updatePost($id: Float!, $body: String!, $title: String!) {
  updatePost(id: $id, title: $title, body: $body) {
    id
    createdAt
    updatedAt
    title
    body
  }
}
    `;

export function useUpdatePostMutation() {
  return Urql.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument);
};
export const UpdateProjectDocument = gql`
    mutation updateProject($id: Float!, $body: String!, $title: String!) {
  updateProject(id: $id, title: $title, body: $body) {
    id
    createdAt
    updatedAt
    title
    body
  }
}
    `;

export function useUpdateProjectMutation() {
  return Urql.useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const PostsDocument = gql`
    query Posts {
  posts {
    id
    createdAt
    updatedAt
    title
    body
  }
}
    `;

export function usePostsQuery(options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options });
};
export const ProjectsDocument = gql`
    query projects {
  projects {
    id
    createdAt
    updatedAt
    title
    body
  }
}
    `;

export function useProjectsQuery(options: Omit<Urql.UseQueryArgs<ProjectsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProjectsQuery>({ query: ProjectsDocument, ...options });
};