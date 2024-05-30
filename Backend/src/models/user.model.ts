class User {
  private googleId: string;
  private displayName: string;
  private email: string;

  constructor(googleId: string, displayName: string, email: string) {
    this.googleId = googleId;
    this.displayName = displayName;
    this.email = email;
  }

  getGoogleId(): string {
    return this.googleId;
  }

  setGoogleId(googleId: string): void {
    this.googleId = googleId;
  }

  getDisplayName(): string {
    return this.displayName;
  }

  setDisplayName(displayName: string): void {
    this.displayName = displayName;
  }

  getEmail(): string {
    return this.email;
  }

  setEmail(email: string): void {
    this.email = email;
  }
}

export default User;
