export interface RegistrationModel{
  loginId: number,
  loginName: string,
  loginPassword: string,
  emailId: string,
  roleId: number,
  roleName: string,
  failureAttempts: number,
  isLock: string,
  type: string,
  isEditing?: boolean;
}
