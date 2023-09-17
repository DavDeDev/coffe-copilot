import React, { ReactDOM } from "react";
type Props = {};
ReactDOM.createPortal(<div></div>)
export default function MainBtn({}: Props) {
  return (
    <div className="px-3 py-1 rounded-lg bg-blue-600">Start Conversation</div>
  );
}
