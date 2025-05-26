import { GraphQLClient } from 'graphql-request';
// import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

function fetcher<TData, TVariables extends { [key: string]: any }>(client: GraphQLClient, query: string, variables?: TVariables, requestHeaders?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request({
    document: query,
    variables,
    requestHeaders
  });
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateEmployeeInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  first_name: Scalars['String']['input'];
  gender: Gender;
  last_name: Scalars['String']['input'];
  salary?: Scalars['Float']['input'];
};

export type Employee = {
  __typename?: 'Employee';
  description?: Maybe<Scalars['String']['output']>;
  first_name: Scalars['String']['output'];
  gender: Gender;
  id: Scalars['Int']['output'];
  last_name: Scalars['String']['output'];
  salary: Scalars['Float']['output'];
};

export enum Gender {
  FEMALE = 'FEMALE',
  MALE = 'MALE',
  OTHER = 'OTHER'
}

export type Mutation = {
  __typename?: 'Mutation';
  EmployeeCreate: Employee;
  EmployeeRemove: Employee;
  EmployeeUpdate: Employee;
};


export type MutationEmployeeCreateArgs = {
  data: CreateEmployeeInput;
};


export type MutationEmployeeRemoveArgs = {
  id: Scalars['Int']['input'];
};


export type MutationEmployeeUpdateArgs = {
  data: UpdateEmployeeInput;
  id: Scalars['Int']['input'];
};

export type PaginatedEmployee = {
  __typename?: 'PaginatedEmployee';
  items: Array<Employee>;
  meta: PaginationMetadata;
};

export type PaginationInput = {
  page?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
};

export type PaginationMetadata = {
  __typename?: 'PaginationMetadata';
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalItems: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  EmployeeFindAll: Array<Employee>;
  EmployeeFindAllWithPagination: PaginatedEmployee;
  EmployeeFindOne?: Maybe<Employee>;
};


export type QueryEmployeeFindAllWithPaginationArgs = {
  pagination: PaginationInput;
};


export type QueryEmployeeFindOneArgs = {
  id: Scalars['Int']['input'];
};

export type UpdateEmployeeInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Gender>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  salary?: InputMaybe<Scalars['Float']['input']>;
};

export type EmployeeCreateMutationVariables = Exact<{
  data: CreateEmployeeInput;
}>;


export type EmployeeCreateMutation = { __typename?: 'Mutation', EmployeeCreate: { __typename?: 'Employee', id: number, first_name: string, last_name: string, salary: number, gender: Gender, description?: string | null } };

export type EmployeeFindAllQueryVariables = Exact<{ [key: string]: never; }>;


export type EmployeeFindAllQuery = { __typename?: 'Query', EmployeeFindAll: Array<{ __typename?: 'Employee', id: number, first_name: string, last_name: string, salary: number, gender: Gender, description?: string | null }> };

export type EmployeeFindAllWithPaginationQueryVariables = Exact<{
  pagination: PaginationInput;
}>;


export type EmployeeFindAllWithPaginationQuery = { __typename?: 'Query', EmployeeFindAllWithPagination: { __typename?: 'PaginatedEmployee', items: Array<{ __typename?: 'Employee', id: number, first_name: string, last_name: string, salary: number, gender: Gender, description?: string | null }>, meta: { __typename?: 'PaginationMetadata', totalItems: number, totalPages: number, page: number, pageSize: number } } };

export type EmployeeFindOneQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type EmployeeFindOneQuery = { __typename?: 'Query', EmployeeFindOne?: { __typename?: 'Employee', id: number, first_name: string, last_name: string, gender: Gender, salary: number, description?: string | null } | null };

export type EmployeeRemoveMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type EmployeeRemoveMutation = { __typename?: 'Mutation', EmployeeRemove: { __typename?: 'Employee', id: number } };

export type EmployeeUpdateMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  data: UpdateEmployeeInput;
}>;


export type EmployeeUpdateMutation = { __typename?: 'Mutation', EmployeeUpdate: { __typename?: 'Employee', first_name: string, last_name: string, salary: number, gender: Gender, description?: string | null } };



export const EmployeeCreateDocument = `
    mutation EmployeeCreate($data: CreateEmployeeInput!) {
  EmployeeCreate(data: $data) {
    id
    first_name
    last_name
    salary
    gender
    description
  }
}
    `;

export const useEmployeeCreateMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<EmployeeCreateMutation, TError, EmployeeCreateMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) => {
    
    return useMutation<EmployeeCreateMutation, TError, EmployeeCreateMutationVariables, TContext>(
      {
    mutationKey: ['EmployeeCreate'],
    mutationFn: (variables?: EmployeeCreateMutationVariables) => fetcher<EmployeeCreateMutation, EmployeeCreateMutationVariables>(client, EmployeeCreateDocument, variables, headers)(),
    ...options
  }
    )};

export const EmployeeFindAllDocument = `
    query EmployeeFindAll {
  EmployeeFindAll {
    id
    first_name
    last_name
    salary
    gender
    description
  }
}
    `;

export const useEmployeeFindAllQuery = <
      TData = EmployeeFindAllQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: EmployeeFindAllQueryVariables,
      options?: Omit<UseQueryOptions<EmployeeFindAllQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<EmployeeFindAllQuery, TError, TData>['queryKey'] },
      headers?: RequestInit['headers']
    ) => {
    
    return useQuery<EmployeeFindAllQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['EmployeeFindAll'] : ['EmployeeFindAll', variables],
    queryFn: fetcher<EmployeeFindAllQuery, EmployeeFindAllQueryVariables>(client, EmployeeFindAllDocument, variables, headers),
    ...options
  }
    )};

export const EmployeeFindAllWithPaginationDocument = `
    query EmployeeFindAllWithPagination($pagination: PaginationInput!) {
  EmployeeFindAllWithPagination(pagination: $pagination) {
    items {
      id
      first_name
      last_name
      salary
      gender
      description
    }
    meta {
      totalItems
      totalPages
      page
      pageSize
    }
  }
}
    `;

export const useEmployeeFindAllWithPaginationQuery = <
      TData = EmployeeFindAllWithPaginationQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: EmployeeFindAllWithPaginationQueryVariables,
      options?: Omit<UseQueryOptions<EmployeeFindAllWithPaginationQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<EmployeeFindAllWithPaginationQuery, TError, TData>['queryKey'] },
      headers?: RequestInit['headers']
    ) => {
    
    return useQuery<EmployeeFindAllWithPaginationQuery, TError, TData>(
      {
    queryKey: ['EmployeeFindAllWithPagination', variables],
    queryFn: fetcher<EmployeeFindAllWithPaginationQuery, EmployeeFindAllWithPaginationQueryVariables>(client, EmployeeFindAllWithPaginationDocument, variables, headers),
    ...options
  }
    )};

export const EmployeeFindOneDocument = `
    query EmployeeFindOne($id: Int!) {
  EmployeeFindOne(id: $id) {
    id
    first_name
    last_name
    gender
    salary
    description
  }
}
    `;

export const useEmployeeFindOneQuery = <
      TData = EmployeeFindOneQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: EmployeeFindOneQueryVariables,
      options?: Omit<UseQueryOptions<EmployeeFindOneQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<EmployeeFindOneQuery, TError, TData>['queryKey'] },
      headers?: RequestInit['headers']
    ) => {
    
    return useQuery<EmployeeFindOneQuery, TError, TData>(
      {
    queryKey: ['EmployeeFindOne', variables],
    queryFn: fetcher<EmployeeFindOneQuery, EmployeeFindOneQueryVariables>(client, EmployeeFindOneDocument, variables, headers),
    ...options
  }
    )};

export const EmployeeRemoveDocument = `
    mutation EmployeeRemove($id: Int!) {
  EmployeeRemove(id: $id) {
    id
  }
}
    `;

export const useEmployeeRemoveMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<EmployeeRemoveMutation, TError, EmployeeRemoveMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) => {
    
    return useMutation<EmployeeRemoveMutation, TError, EmployeeRemoveMutationVariables, TContext>(
      {
    mutationKey: ['EmployeeRemove'],
    mutationFn: (variables?: EmployeeRemoveMutationVariables) => fetcher<EmployeeRemoveMutation, EmployeeRemoveMutationVariables>(client, EmployeeRemoveDocument, variables, headers)(),
    ...options
  }
    )};

export const EmployeeUpdateDocument = `
    mutation EmployeeUpdate($id: Int!, $data: UpdateEmployeeInput!) {
  EmployeeUpdate(id: $id, data: $data) {
    first_name
    last_name
    salary
    gender
    description
  }
}
    `;

export const useEmployeeUpdateMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<EmployeeUpdateMutation, TError, EmployeeUpdateMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) => {
    
    return useMutation<EmployeeUpdateMutation, TError, EmployeeUpdateMutationVariables, TContext>(
      {
    mutationKey: ['EmployeeUpdate'],
    mutationFn: (variables?: EmployeeUpdateMutationVariables) => fetcher<EmployeeUpdateMutation, EmployeeUpdateMutationVariables>(client, EmployeeUpdateDocument, variables, headers)(),
    ...options
  }
    )};
