export class User {
    id?: string;
    username?: string;
    email?: string;
    photoUrl: string;
    displayName: string;
    emailVerified: boolean;
    country?: string;
    toJson?: any;
    fromJson?: any;

    constructor(
        id: string = '',
        email: string = '',
        displayName: string = '',
        photoUrl: string = '',
        emailVerified: boolean = false,
        country: string = '',
        username: string = ''
    ) {
        this.id = id,
        this.email = email,
        this.displayName = displayName,
        this.photoUrl = photoUrl,
        this.emailVerified = emailVerified;
        this.country = country,
        this.username = username;
        this.toJson = () => {
            return {
                id: this.id,
                email: this.email,
                displayName: this.displayName,
                photoUrl: this.photoUrl,
                country: this.country,
                username: this.username,
                emailVerified: this.emailVerified,
            };
        };
        this.fromJson = (data: any) => {
            this.id = data.id;
            this.email = data.email;
            this.displayName = data.displayName;
            this.photoUrl = data.photoUrl;
            this.country = data.country;
            this.username = data.username;
            this.emailVerified = data.emailVerified;
            return this;
        };
    }
}
