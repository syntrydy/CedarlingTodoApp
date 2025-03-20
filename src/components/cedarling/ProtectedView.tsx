import React from "react";
import { useCedarling } from "../../cedarling/hooks/useCedarling";
import { useAuth } from "../../context/AuthContext";

function ProtectedView({
  actionId,
  resourceId,
  children,
  loadingFallback = <div>Loading...</div>,
  todoItem = {
    author: "",
    completed: false,
  },
  context = {},
  isDashboard = false,
}: any) {
  const { authorize, isLoading, error } = useCedarling();
  const { user } = useAuth();
  const [isAuthorized, setIsAuthorized] = React.useState(false);

  React.useEffect(() => {
    const checkAuthorization = async (user: any) => {
      const request = {
        tokens: {
          userinfo_token: user.userInfoToken,
        },
        action: `TodoApp::Action::"${actionId}"`,
        resource: isDashboard === false
          ? {
              type: "TodoApp::TodoItem",
              id: resourceId,
              author: todoItem.author,
              completed: todoItem.completed,
            }
          : {
              type: "TodoApp::TodoList",
              id: resourceId,
            },
        context: context,
      };
      try {
        const result = await authorize(request);
        setIsAuthorized(typeof result === "boolean" ? result : result.decision);
      } catch (err) {
        setIsAuthorized(false);
      }
    };
    checkAuthorization(user);
  }, [authorize, actionId, resourceId, user]);
  if (isLoading) return <>{loadingFallback}</>;
  if (error) return <></>;
  if (!isAuthorized) return <></>;
  return <>{children}</>;
}

export default ProtectedView;
