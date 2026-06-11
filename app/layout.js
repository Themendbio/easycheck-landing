import "./globals.css";

export const metadata = {
  title: "Easycheck — 랜딩 페이지",
  description: "몸이 보내는 SOS, 놓치고 계셨나요? EASYCHECK는 스마트워치의 PPG 신호를 AI로 분석해 체내 수분 지수를 즉각적으로 확인합니다.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="preconnect"
          href="https://cdn.jsdelivr.net"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
