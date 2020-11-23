import UserStore from '@/store/user';

// 即可以通过权限id, 也可以通过权限名称来鉴权
export const checkPermission = (permissionId?: number, permissionName?: string) => {
  const permissionList = UserStore.userInfo.permission.filter(
    (item) => item.type === 'route'
  )
  if(permissionId) {
    return permissionList.some((item) => item.id === permissionId);
  } else if (permissionName) {
    return permissionList.some((item) => item.name === permissionName);
  } else {
    return true;
  }
}