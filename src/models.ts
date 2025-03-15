class User {
    id!: string;
    name!: string;
    email!: string;
    password!: string
}

class Project{
    id!: string;
    name!: string;
    description?: string;
    hasLiveExample!: boolean;
    liveExampleLink?: string;
    banner?: string;
    tags?: Tags[]
    owner!: User
}

class Tags{
    id!: string
    name!: string
}
