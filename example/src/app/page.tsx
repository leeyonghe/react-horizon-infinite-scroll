'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-horizon-infinite-scroll";
import Parser from 'html-react-parser';

export default function Home() {

  const obj = [
    {
      imgURL: '/banner01.png',
      imgURL2: '/banner01_mo.png',
      imgAlt: 'img-1',
      isMovie: false,
      title: '외국어 테스트',
      subtitle: '자세한 외국어 테스트입니다.',
      link: '/naver',
      logo: '/naver.png'
    },
    {
      imgURL: '/movie.mp4',
      imgURL2: '/movie.mp4',
      isMovie: true,
      imgAlt: 'img-2',
      title: '이건 한국어 테스트',
      subtitle: '이건 한국어 테스트입니다.',
      link: '/kakao',
      logo: '/kakao.png'
    },
  ];
  const [isHorizontal, setIsHorizontal] = useState(true);

  function makeExplainHtml(obj: { imgURL: string; imgURL2: string; imgAlt: string; isMovie: boolean; title: string; subtitle: string; link: string; logo: string; }): import("react").ReactNode {
    return <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', }}>
      <Image src={`${obj.logo}`}
        className=""
        alt=""
        width={120}
        height={0}></Image>
      <span className="text-3xl text-white font-sb_ar_b mt-5">{Parser(`${obj.title}`)}</span>
      <span className="text-base text-white pretendard font-thin my-1">{`${obj.subtitle}`}</span>
      <div>
        <button className="py-2 px-10 bg-white rounded-full mt-3" onClick={() => {
          document.location.href = `${obj.link}`;
        }}>
          <span className="text-md text-black pretendard" >시작하기</span>
        </button>
      </div>
    </div>
  }

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      {/* <div className="mb-4 p-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isHorizontal}
            onChange={(e) => setIsHorizontal(e.target.checked)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span>Horizontal Scroll</span>
        </label>
      </div> */}
      <InfiniteScroll
        height={500}
        isHorizontal={isHorizontal}
        data={[{
          id: 0,
          color: "#65454a",
          backgroundImage: "/banner01.png",
          backgroundVideo: "",
          explainHtml: makeExplainHtml(obj[0]),
          explainCSS: {}
        }, {
          id: 1,
          color: "#65124a",
          backgroundImage: "/banner01.png",
          backgroundVideo: "/zemit-banner-pc.mp4",
          explainHtml: makeExplainHtml(obj[1]),
          explainCSS: {}
        }]}
        leftButton="/ic-before.png"
        leftButtonCSS={{ width: '50px', height: '50px' }}
        rightButton="/ic-after.png"
        rightButtonCSS={{ width: '50px', height: '50px' }} />

    </div>
  );
}
