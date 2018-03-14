export const GET_PERMISSIONS_REQUEST = 'index/GET_PERMISSIONS_REQUEST';

function getPermissionsRequest(permissions) {
  return {type: GET_PERMISSIONS_REQUEST,permissions:permissions}
}

export function getPermissions() {
  return function (dispatch) {
    dispatch(getPermissionsRequest({isLoading:true}));

    return fetch('/api/user.json').then((response => {
      return response.json()
    })).then((json) => {
      setTimeout(() => {
        dispatch(getPermissionsRequest(json))
      }, 2000);

    }).catch(() => {
      dispatch(getPermissionsRequest({errMsg:'请求错误'}));
    })
  }
}
