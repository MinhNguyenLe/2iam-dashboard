import LoadingScreen from "components/LoadingScreen";
import useLoading from "hooks/useLoading";
import { createContext, ReactNode, useEffect, useReducer } from "react";
import toast from "react-hot-toast";
import axios from "utils/axios";

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AuthUser = null | Record<string, any>;

export type AuthState = {
  isGettingDefault?: boolean;
  isAuthenticated: boolean;
  user: AuthUser;
};

enum Types {
  Init = "INIT",
  Login = "LOGIN",
  Logout = "LOGOUT",
  Register = "REGISTER",
}

type JWTAuthPayload = {
  [Types.Init]: {
    isAuthenticated: boolean;
    user: AuthUser;
  };
  [Types.Logout]: undefined;
  [Types.Login]: { user: AuthUser };
  [Types.Register]: { user: AuthUser };
};

type JWTActions = ActionMap<JWTAuthPayload>[keyof ActionMap<JWTAuthPayload>];

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  isGettingDefault: true,
};

const setSession = (accessToken: string | null) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem("accessToken");
    delete axios.defaults.headers.common.Authorization;
  }
};

const reducer = (state: AuthState, action: JWTActions) => {
  switch (action.type) {
    case "INIT": {
      return {
        isGettingDefault: false,
        user: action.payload.user,
        isAuthenticated: action.payload.isAuthenticated,
      };
    }
    case "LOGIN": {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    }
    case "REGISTER": {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    }

    default: {
      return state;
    }
  }
};

const AuthContext = createContext({
  ...initialState,
  method: "JWT",
  login: (email: string, password: string) => Promise.resolve(),
  logout: () => {},
  register: (email: string, password: string, username: string) =>
    Promise.resolve(),
});

// props type
type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (email: string, password: string) => {
    const response: any = await axios.post("/api/auth/login", {
      email,
      password,
    });
    const { accessToken, user } = response.data;

    setSession(accessToken);
    dispatch({
      type: Types.Login,
      payload: {
        user,
      },
    });
  };

  const register = async (
    email: string,
    username: string,
    password: string
  ) => {
    const response: any = await axios.post("/api/auth/register", {
      email,
      username,
      password,
    });
    const { accessToken, user } = response.data;
    setSession(accessToken);

    dispatch({
      type: Types.Register,
      payload: {
        user,
      },
    });
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: Types.Logout });
  };

  const { isLoading, fetch } = useLoading({
    onSuccess: (response) => {
      if (response?.status === 401) {
        dispatch({
          type: Types.Init,
          payload: {
            user: null,
            isAuthenticated: false,
          },
        });
      } else if (response?.status === 200) {
        const user = response.data?.user?.oauth?.google;
        if (!user) {
          toast.error("Server error: don't return user");
        }
        dispatch({
          type: Types.Init,
          payload: {
            user: {
              avatar: user?.photos?.value,
              name: user?.displayName,
            },
            isAuthenticated: true,
          },
        });
      }
    },
    onError: (err) => {
      dispatch({
        type: Types.Init,
        payload: {
          user: null,
          isAuthenticated: false,
        },
      });
    },
  });

  useEffect(() => {
    console.log("URL ???", process.env.REACT_APP_API_URL);
    fetch(() =>
      axios.get(`${process.env.REACT_APP_API_URL}/iam`, {
        withCredentials: true,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "JWT",
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
