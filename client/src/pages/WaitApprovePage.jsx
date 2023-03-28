import React from "react";
import waitApproveImg from "../images/waitApproveImg.png";

function WaitApprovePage() {
  const logOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="wait-approve">
      <img src={waitApproveImg} alt="" />
      <span>Уведомление</span>
      <h2>Администратор ещё не допустил вас к платформе</h2>
      <p>Подождите немного или обратитесь к администратору.</p>
      <button onClick={() => logOut()}>Выйти</button>
    </div>
  );
}

export default WaitApprovePage;
