export interface IChangePasswordRequest {
  employeeId: number;
  newPassword: string;
  repeatPassword: string;
  currentPassword: string;
}