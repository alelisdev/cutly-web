import React from "react";
import { useNavigate, useParams } from 'react-router-dom';

/**
 * With navigation HOC
 * @param Component
 */
export function withNavigation(Component: any) {
  return (props: any) => <Component {...props} navigate={useNavigate()}/>;
}

/**
 * With param HOC
 * @param Component
 */
export function withParams(Component: any) {
  return (props: any) => <Component {...props} params={useParams()}/>;
}