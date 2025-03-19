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
  const [isAuthorized, setIsAuthorized] = React.useState(false);

  React.useEffect(() => {
    const { user } = useAuth();
    const checkAuthorization = async (user: any) => {
      const request = {
        tokens: {
          access_token: null,
          id_token: null,
          userinfo_token: user.userInfoToken,
        },
        action: actionId ? "Todo::Action::" + actionId : "Todo::Action::'view'",
        resource: { type: "UIComponent", id: resourceId, name: resourceId },
        context: {},
      };
      try {
        const result = await authorize(request);
        setIsAuthorized(typeof result === "boolean" ? result : result.decision);
      } catch (err) {
        setIsAuthorized(false);
      }
    };
    checkAuthorization(user);
  }, [authorize, actionId, resourceId]);
  if (isLoading) return <>{loadingFallback}</>;
  if (error) return <></>;
  if (!isAuthorized) return <></>;
  return <>{children}</>;
}

export default ProtectedView;
