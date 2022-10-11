import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IRootState } from "../../PSolutions.State";

interface Props {
  children: any;
}

export const LocationProvider = React.memo(({children}: Props) => {
  let navigate = useNavigate();
  const {isAuthenticated} = useSelector((state: IRootState) => state.app);
  const {locationId} = useSelector((state: IRootState) => state.currentLocation);

  useEffect(() => {
    if (locationId === 0) navigate("Locations");
  }, [isAuthenticated, locationId, navigate])

  return <React.Fragment>{children}</React.Fragment>
});