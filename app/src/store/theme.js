import generate from 'common/redux/client';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

const { reducer, actions: ThemeActions } = generate('theme');

export const resetAction = (dispatch) => {
  return ThemeActions.RESET(dispatch);
};

export const getItemAction = async (dispatch, id) => {
  try {
    ThemeActions.LOADING(dispatch);

    let payload = await fetch(`${apiUrl}/theme/`, {
      method: 'GET',
      headers: {}
    });
    payload = await payload.json();

    ThemeActions.ITEM(dispatch, payload);
  } catch (error) {
    ThemeActions.ERROR(dispatch, error.message);
  }
};

export const saveItemAction = async (dispatch, data) => {
  try {
    ThemeActions.LOADING(dispatch);

    let payload = await fetch(`${apiUrl}/theme/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    payload = await payload.json();
    payload = payload.id || payload.updated;

    ThemeActions.SAVE(dispatch, payload);
  } catch (error) {
    ThemeActions.ERROR(dispatch, error.message);
  }
};

export const themeMapDispatchToProps = (dispatch) => ({
  reset: () => resetAction(dispatch),
  getItem: (id) => getItemAction(dispatch, id),
  saveItem: (data) => saveItemAction(dispatch, data)
});

export const themeMapStateToProps = ({ theme }) => theme;

export default reducer;
