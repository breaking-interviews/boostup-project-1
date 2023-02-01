import { IconRibbon, IconWon, IconPaper, IconPlace } from "assets/icon";
import useGetStudentInfo from "hooks/mypage/useGetStudentInfo";
import { useEffect } from "react";
import useDeleteApply from "hooks/mypage/useDeleteApply";
import Swal from "sweetalert2";
const StudentClass = () => {
  const { refetch: refetchStudentInfo, data: studentInfoData } =
    useGetStudentInfo();

  const { mutate } = useDeleteApply();
  const deleteApply = (suggestId: number) => {
    console.log(suggestId);
    Swal.fire({
      title: "신청을 취소하시겠습니까?",
      icon: "question",

      showCancelButton: true,
      confirmButtonColor: "#3085d6",
    }).then(result => {
      if (result.isConfirmed) {
        mutate(suggestId);

        return Swal.fire({
          text: "삭제가 완료되었습니다",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
      }
    });
  };
  return (
    <>
      <div className="mt-6 flex flex-row w-full">
        <div className="w-full">
          {studentInfoData?.data.data.map((tutor: any) => (
            <div className="flex flex-row h-fit w-full rounded-lg border border-borderColor mt-3">
              {/* {Left} */}
              <div className="flex desktop:w-1/4 justify-center items-center ">
                {tutor.profileImage ? (
                  <img
                    className="flex desktop:w-[200px] tablet:w-[150px] w-[100px] object-cover border border-borderColor rounded-xl m-3"
                    src={tutor.profileImage}
                  />
                ) : (
                  <img
                    className="flex desktop:w-[200px] tablet:w-[150px] w-[100px] object-cover border border-borderColor rounded-xl m-3"
                    src={
                      "https://play-lh.googleusercontent.com/38AGKCqmbjZ9OuWx4YjssAz3Y0DTWbiM5HB0ove1pNBq_o9mtWfGszjZNxZdwt_vgHo=w240-h480-rw"
                    }
                  />
                )}
              </div>
              {/* {center} */}
              <div className="flex flex-col w-1/2 justify-center desktop:pl-2">
                <div className="flex">
                  {tutor.languages?.map((el: any, idx: any) => {
                    return (
                      <div
                        key={idx}
                        className={`flex justify-center bg-${el} items-center px-1 py-0.5 ml-1 mt-1 border rounded-xl desktop:text-xs tablet:text-[10px] text-[6px]`}
                      >
                        {el}
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-start items-start w-full h-fit font-SCDream5 desktop:text-xs tablet:text-[12px] text-[8px] text-textColor ml-2  my-1">
                  {tutor.name}
                </div>
                <div className="flex justify-start items-start w-full h-fit font-SCDream6 desktop:text-lg tablet:text-base text-xs text-textColor ml-1 mb-2 flex-wrap">
                  {tutor.title}
                </div>
                <div className="flex justify-start items-start w-full h-fit font-SCDream5 text-textColor ml-2 mb-2 desktop:text-sm tablet:text-sm text-[12px]">
                  <div className="mr-1 desktop:w-5 tablet:w-3.5 w-3.5">
                    <IconRibbon />
                  </div>
                  {tutor.company}
                </div>
                <div className="flex justify-start items-start w-full h-fit font-SCDream5 desktop:text-sm tablet:text-sm text-[12px] text-textColor ml-2  mb-2">
                  <div className="mr-1 desktop:w-5 tablet:w-3.5 w-3.5">
                    <IconPaper />
                  </div>
                  {tutor.career}년
                </div>
                <div className="flex justify-start items-start w-full h-fit font-SCDream5 desktop:text-sm tablet:text-sm text-[12px] text-textColor ml-2 desktop:my-1 mb-1">
                  <div className="mr-1 desktop:w-4 tablet:w-3 w-2.5 ">
                    <IconPlace />
                  </div>
                  {tutor.address?.map((el: any, idx: any) => {
                    return (
                      <div className="ml-1" key={idx}>
                        {el}
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* {Right} */}
              <div className="flex flex-col w-1/3 justify-center items-end desktop:mr-4 tablet:mr-2 mr-2">
                <div className="flex  desktop:text-xl tablet:text-lg text-[14px]">
                  <div className="mt-1 mr-1 desktop:w-5 tablet:w-4 w-3">
                    <IconWon />
                  </div>
                  {tutor.cost}원
                </div>
                <div className="mt-5 tablet:mt-3 desktop:text-sm tablet:text-xs text-[8px]">
                  {tutor.status}
                </div>
                <div className="mb-5 tablet:mb-3 desktop:text-sm tablet:text-xs text-[8px]">
                  CreatedAt
                </div>
                <div className="flex">
                  <button className="text text-pointColor m-2 desktop:text-base tablet:text-sm text-[10px]">
                    채팅하기
                  </button>
                  <button
                    className="text text-negativeMessage m-2 desktop:text-base tablet:text-sm text-[10px]"
                    onClick={() => deleteApply(tutor.suggestId)}
                  >
                    신청취소
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default StudentClass;
