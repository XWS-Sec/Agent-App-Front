import { unsignedUser,User } from '../context/auth-context'; 
import { Role } from '../model/enums/role.enum';
import { LocalStorageItem } from './local-storage-item.enum';

class LocalStorageUtil {
  public getUser(): User {

    const username = this.getUsername();

    if (username) {
      const user: User = {
        loggedIn: true,
        id: this.getUserId(),
        userName: this.getUsername(),
        role: this.getRole(),
        companyId: this.getCompanyId(),
      };

      return user;
    }

    return unsignedUser;
  }

  public setUser(user: User): void {
    this.setUserId(user.id);
    this.setUsername(user.userName);
    this.setRole(user.role);
    this.setCompanyId(user.companyId);
  }

  public getCompanyId(): string {
    const companyId = localStorage.getItem(LocalStorageItem.COMPANY_ID);
    return companyId ? companyId : '';
  }

  public setCompanyId(value: string): void{
    localStorage.setItem(LocalStorageItem.COMPANY_ID,value.toString());
  }

  public getUserId(): string {
    const userId = localStorage.getItem(LocalStorageItem.USER_ID);
    return userId ? userId : '';
  }

  public setUserId(value: string): void {
    localStorage.setItem(LocalStorageItem.USER_ID, value.toString());
  }

  public getUsername(): string {
    const username = localStorage.getItem(LocalStorageItem.USERNAME);
    return username ? username : '';
  }

  public setUsername(value: string): void {
    localStorage.setItem(LocalStorageItem.USERNAME, value);
  }
  public getRole(): Role {
    const roleStr = localStorage.getItem(LocalStorageItem.ROLE);

    if (roleStr) {
      return roleStr as Role;
    }

    return Role.UNDEFINED;
  }

  public setRole(role: Role): void {
    localStorage.setItem(LocalStorageItem.ROLE, role);
  }
}

const localStorageUtil = new LocalStorageUtil();
export default localStorageUtil;
