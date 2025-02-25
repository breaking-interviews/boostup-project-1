import CreateModalContainer from "../reuse/container/CreateModalContainer";
import { useForm } from "react-hook-form";
import SmallBtn from "../reuse/btn/SmallBtn";
import usePostDecline from "hooks/mypage/usePostDecline";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { PropsWithChildren } from "react";

interface Decline {
  reason: string;
  suggestId: any;
}

interface ModalDefaultType {
  onClickToggleModal: (suggestId: number) => void;
  suggestId: number;
}

const DeclineModal = ({
  onClickToggleModal,
  suggestId,
}: PropsWithChildren<ModalDefaultType>) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Decline>({ mode: "onBlur" });
  //SuggestId 입력필요
  const { mutate, isSuccess, isError } = usePostDecline();

  const onSubmit = (e: Decline) => {
    const declineData = {
      reason: e.reason,
      suggestId: suggestId,
    };

    mutate(declineData);
  };
  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        text: "거절이 완료되었습니다",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
      onClickToggleModal(suggestId);
    }

    if (isError) {
      Swal.fire({
        text: "다시 입력해주세요",
        icon: "warning",
        confirmButtonColor: "#3085d6",
      });
    }
  }, [isSuccess, isError]);

  return (
    <>
      <div className="fixed z-10 top-0 left-0 bottom-0 right-0 bg-modalBgColor grid place-items-center">
        <CreateModalContainer>
          <form
            className="flex flex-col items-center w-full text-sm z-20"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex w-11/12 desktop:w-4/6 h-fit font-SCDream7 text-lg text-textColor mt-4">
              거절하기
            </div>

            <div className="flex w-11/12 desktop:w-4/6 h-fit font-SCDream5 text-base text-textColor mt-2 mb-2">
              거절 사유를 입력해주세요
            </div>
            <input
              type="text"
              placeholder="거절 사유 ex.시간 재조정 필요, 수업언어 불일치 등등"
              className="w-11/12 desktop:w-4/6 h-fit p-2 border border-borderColor outline-pointColor rounded-xl font-SCDream4 text-xs text-textColor tablet:text-sm "
              {...register("reason", { required: "필수 정보입니다." })}
            />
            <p className="w-11/12 text-xs text-negativeMessage ml-2 mt-1 tablet:text-sm desktop:w-4/6">
              {errors?.reason && <span>필수 정보입니다</span>}
            </p>
            <div className="flex flex-row justify-center items-center w-full h-fit mt-10">
              <SmallBtn
                type="button"
                css="mr-4"
                onClick={e => onClickToggleModal(suggestId)}
              >
                취 소
              </SmallBtn>
              <SmallBtn type="submit">거 절</SmallBtn>
            </div>
          </form>
        </CreateModalContainer>
      </div>
    </>
  );
};

export default DeclineModal;
