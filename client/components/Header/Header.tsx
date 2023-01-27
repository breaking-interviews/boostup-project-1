import { useState } from "react";
import { useRecoilState } from "recoil";
import { SubmitHandler } from "react-hook-form";
import { textColor } from "assets/color/color";
import { IconExit, IconMagnify } from "assets/icon/";
import { SearchPop } from "./SearchPop";
import { powerWriteModal } from "atoms/main/mainAtom";
import Image from "next/image";
import Logo from "../../public/images/logo.png";
import Link from "next/link";
import { logUser } from "atoms/auth/authAtom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

interface SearchData {
  name: string;
  address: number;
  career: string;
  language: number;
  startCost: string;
  endCost: string;
}

const Header = () => {
  const [log, setLog] = useRecoilState<boolean>(logUser);
  const [seek, setSeek] = useState(false);
  const [isPowerWrite, setIsPowerWrite] = useRecoilState(powerWriteModal);

  const onSubmit: SubmitHandler<SearchData> = data => {
    console.log(data);
  };

  const toWrite = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsPowerWrite(prev => !prev);
  };

  const logOutEvent = () => {
    localStorage.clear();
    setLog(prev => !prev);
    toast.success("로그아웃이 되었습니다", {
      autoClose: 1500,
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <>
      <header className="bg-bgColor font-SCDream5 w-full pt-4 fixed top-0 z-[1] h-fit desktop:w-3/4 desktop:min-w-[1000px] desktop:h-[87px] desktop:mt-0">
        <nav className="w-full h-full flex tablet:justify-center tablet:items-center desktop:justify-between">
          <div className="w-1/2 flex justify-start items-center ml-4 tablet:h-[40px] desktop:hidden">
            <div className="w-8 tablet:w-[34.5px]" onClick={logOutEvent}>
              <IconExit />
            </div>
          </div>
          <div className="tablet:w-1/6 h-fit flex justify-center items-center desktop:justify-start desktop:items-end">
            <div className="flex justify-center items-center w-28 tablet:w-[142px] h-[69px] h-min-[69px]">
              <Link href="/">
                <Image src={Logo} alt="logo" />
              </Link>
            </div>
          </div>
          <div className="w-1/2 flex justify-end items-center mr-4 tablet:h-[40px] desktop:hidden">
            <div
              className="w-9 tablet:w-[34.5px]"
              onClick={e => setSeek(!seek)}
            >
              <IconMagnify fill={textColor} />
            </div>
          </div>
          <div className="hidden desktop:flex desktop:items-end desktop:w-min-[500px] desktop:w-[648px] desktop:h-full desktop:relative desktop:visible">
            <div
              className={`w-full h-[50px] flex justify-center items-center border border-borderColor outline-pointColor font-SCDream2 text-sm text-textColor bg-white 
             ${seek ? `rounded-tr-xl rounded-tl-xl` : `rounded-xl`}`}
              onClick={e => setSeek(!seek)}
            >
              <div>조건에 맞는 과외선생님을 찾아보세요</div>
            </div>
            {/* {seek && <SearchPop onSubmit={onSubmit} />} */}
          </div>
          <div className="w-1/5 h-full hidden desktop:flex desktop:flex-row-reverse desktop:items-end">
            <div className="w-full pt-2 desktop:flex desktop:h-[50px] desktop:justify-end text-sm">
              {/* {log ? (
                <>
                  <div className="min-w-fit mr-8 py-1">마이페이지</div>
                  <div className="min-w-fit mr-8 py-1" onClick={logOutEvent}>
                    로그아웃
                  </div>
                  <div
                    onClick={toWrite}
                    className="min-w-fit w-1/4 h-fit p-1 rounded-md bg-pointColor text-white text-center"
                  >
                    과외등록
                  </div>
                </>
              ) : (
                <>
                  <div className="mr-8">
                    <Link href="/login">로그인</Link>
                  </div>
                  <div>
                    <Link href="/signup">회원가입</Link>
                  </div>
                </>
              )} */}
            </div>
          </div>
        </nav>
        {seek && (
          <div className="absolute top-40">
            <SearchPop onSubmit={onSubmit} />
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
