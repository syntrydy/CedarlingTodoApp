import React from "react";
import { useCedarling } from "../../cedarling/hooks/useCedarling";
import { useAuth } from "../../context/AuthContext";

function ProtectedView({
  actionId,
  resourceId,
  children,
  loadingFallback = <div>Loading...</div>,
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
        resource: {
          type: "TodoApp::TodoItem",
          id: resourceId,
          author: user.userInfo.email,
        },
        context: {},
      };
      try {
        const result = await authorize(request);
        console.log("Authorization result: ", result);
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
