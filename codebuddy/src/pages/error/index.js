import React, { useEffect, useState } from "react";
import {Button} from '../../components/button/index'
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <section className="flex items-center justify-center">
      <div className="flex flex-col gap-8">
        <p className="text-2xl text-white">Looks like we ran into some Error!!!</p>
        <Button
            buttonType="outlined-dark"
            rounded={true}
            onClick={() => {
              navigate("/");
            }}
          >
            Get back to Dashboard
          </Button>
      </div>
    </section>
  );
}

export default ErrorPage;
