const userPermissionChecker = (user, permission) => {
  return user && user.privileges && user.privileges.includes(permission)
}

export default userPermissionChecker
