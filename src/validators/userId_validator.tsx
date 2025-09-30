function userIdValidator(userId: string): string {
    let err:string = "";

    if (userId.length === 0) err = "User ID is required.";

    return err
}

export default userIdValidator