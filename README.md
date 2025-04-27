# React Horizon Infinite Scroll / 리액트 호라이즌 무한 스크롤

A lightweight and customizable infinite scroll component for React applications. This component provides smooth infinite scrolling functionality with support for both window and container-based scrolling.

React 애플리케이션을 위한 가볍고 커스터마이징 가능한 무한 스크롤 컴포넌트입니다. 이 컴포넌트는 윈도우와 컨테이너 기반 스크롤링을 모두 지원하는 부드러운 무한 스크롤 기능을 제공합니다.

## Features / 기능

- 🚀 Smooth infinite scrolling implementation / 부드러운 무한 스크롤 구현
- ⚙️ Configurable scroll threshold / 설정 가능한 스크롤 임계값
- 🔄 Support for both window and container-based scrolling / 윈도우와 컨테이너 기반 스크롤링 모두 지원
- 🎨 Customizable loading indicator / 커스터마이징 가능한 로딩 표시기
- 📱 Responsive design / 반응형 디자인
- ✅ Comprehensive test coverage / 포괄적인 테스트 커버리지
- 🔍 TypeScript support (optional) / TypeScript 지원 (선택적)

스크롤방법
1 -> 2 -> 3 -> 1 -> 2 -> 3 -> ...

## Installation / 설치

```bash
npm install react-horizon-infinite-scroll
# or
yarn add react-horizon-infinite-scroll
```

## Usage / 사용법

### Basic Usage / 기본 사용법

```jsx
import React, { useState } from 'react';
import InfiniteScroll from 'react-horizon-infinite-scroll';

function App() {
  const [items, setItems] = useState(Array.from({ length: 20 }, (_, i) => i + 1));
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = () => {
    if (isLoading) return;
    setIsLoading(true);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const newItems = Array.from(
          { length: 20 },
          (_, i) => items.length + i + 1
        );
        setItems((prevItems) => [...prevItems, ...newItems]);
        setHasMore(items.length < 100);
        setIsLoading(false);
        resolve();
      }, 1000);
    });
  };

  return (
    <InfiniteScroll
      onLoadMore={loadMore}
      hasMore={hasMore}
      loader={<div>Loading...</div>}
      threshold={100}
    >
      <div style={{ display: 'grid', gap: '1rem', padding: '1rem' }}>
        {items.map((item) => (
          <div
            key={item}
            style={{
              padding: '1rem',
              background: '#f0f0f0',
              borderRadius: '4px',
            }}
          >
            Item {item}
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
}
```

### Advanced Usage / 고급 사용법

#### Custom Loading Component / 커스텀 로딩 컴포넌트

```jsx
import React from 'react';
import InfiniteScroll from 'react-horizon-infinite-scroll';

const CustomLoader = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    padding: '20px' 
  }}>
    <div className="spinner"></div>
    <span style={{ marginLeft: '10px' }}>Loading more items...</span>
  </div>
);

function App() {
  // ... other code ...

  return (
    <InfiniteScroll
      onLoadMore={loadMore}
      hasMore={hasMore}
      loader={<CustomLoader />}
      threshold={150}
    >
      {/* Content */}
    </InfiniteScroll>
  );
}
```

#### Container-based Scrolling / 컨테이너 기반 스크롤링

```jsx
function App() {
  return (
    <div style={{ height: '500px', border: '1px solid #ccc' }}>
      <InfiniteScroll
        onLoadMore={loadMore}
        hasMore={hasMore}
        scrollContainer="parent"
        style={{ height: '100%', overflow: 'auto' }}
      >
        <div style={{ padding: '20px' }}>
          {items.map((item) => (
            <div key={item} className="item">
              Item {item}
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
```

#### Error Handling / 에러 처리

```jsx
function App() {
  const [error, setError] = useState(null);

  const loadMore = () => {
    return new Promise((resolve, reject) => {
      // Simulate API call
      fetch('https://api.example.com/items')
        .then(response => {
          if (!response.ok) throw new Error('Network error');
          return response.json();
        })
        .then(data => {
          setItems(prev => [...prev, ...data]);
          setHasMore(data.length > 0);
          resolve();
        })
        .catch(err => {
          setError(err.message);
          reject(err);
        });
    });
  };

  return (
    <InfiniteScroll
      onLoadMore={loadMore}
      hasMore={hasMore}
      loader={<div>Loading...</div>}
    >
      {error ? (
        <div style={{ color: 'red', padding: '20px' }}>
          Error: {error}
          <button onClick={() => setError(null)}>Retry</button>
        </div>
      ) : (
        <div className="items-container">
          {items.map(item => (
            <div key={item.id} className="item">
              {item.content}
            </div>
          ))}
        </div>
      )}
    </InfiniteScroll>
  );
}
```

### Props / 속성

| Prop / 속성 | Type / 타입 | Default / 기본값 | Description / 설명 |
|------------|------------|-----------------|-------------------|
| `children` | ReactNode | required / 필수 | Content to be rendered inside the scroll container / 스크롤 컨테이너 내부에 렌더링될 콘텐츠 |
| `onLoadMore` | () => Promise<void> | required / 필수 | Function called when more content needs to be loaded / 더 많은 콘텐츠를 로드해야 할 때 호출되는 함수 |
| `hasMore` | boolean | required / 필수 | Indicates if there is more content to load / 로드할 더 많은 콘텐츠가 있는지 여부를 나타냄 |
| `loader` | ReactNode | null | Loading indicator component / 로딩 표시기 컴포넌트 |
| `threshold` | number | 200 | Distance from bottom (in pixels) to trigger loading / 로딩을 트리거할 하단으로부터의 거리(픽셀) |
| `scrollContainer` | 'window' \| 'parent' | 'window' | Type of scroll container to use / 사용할 스크롤 컨테이너 유형 |
| `className` | string | undefined | CSS class for the container / 컨테이너의 CSS 클래스 |
| `style` | CSSProperties | undefined | Inline styles for the container / 컨테이너의 인라인 스타일 |

### Best Practices / 모범 사례

1. **Performance Optimization / 성능 최적화**
   - Use `React.memo` for child components / 자식 컴포넌트에 `React.memo` 사용
   ```jsx
   const Item = React.memo(({ data }) => (
     <div className="item">{data}</div>
   ));
   ```
   - Implement proper cleanup in `onLoadMore` / `onLoadMore`에서 적절한 정리 구현
   ```jsx
   const loadMore = () => {
     let isMounted = true;
     return new Promise((resolve) => {
       fetchData().then(data => {
         if (isMounted) {
           setItems(prev => [...prev, ...data]);
           resolve();
         }
       });
       return () => { isMounted = false; };
     });
   };
   ```
   - Use virtualization for large lists / 대용량 목록에 가상화 사용
   ```jsx
   import { VirtualizedList } from 'react-virtualized';
   
   <InfiniteScroll onLoadMore={loadMore} hasMore={hasMore}>
     <VirtualizedList
       rowCount={items.length}
       rowHeight={100}
       rowRenderer={({ index }) => (
         <Item data={items[index]} />
       )}
     />
   </InfiniteScroll>
   ```

2. **Error Handling / 오류 처리**
   - Implement error boundaries / 오류 경계 구현
   - Handle failed load attempts / 실패한 로드 시도 처리
   - Provide retry mechanisms / 재시도 메커니즘 제공

3. **Accessibility / 접근성**
   - Ensure keyboard navigation support / 키보드 탐색 지원 보장
   - Provide loading state announcements / 로딩 상태 알림 제공
   - Maintain focus management / 포커스 관리 유지

## Development / 개발

### Project Structure / 프로젝트 구조

```
react-horizon-infinite-scroll/
├── src/
│   ├── components/
│   │   ├── InfiniteScroll.js
│   │   └── __tests__/
│   │       └── InfiniteScroll.test.js
│   ├── App.js
│   ├── index.js
│   └── setupTests.js
├── public/
│   └── index.html
├── package.json
└── README.md
```

### Running Tests / 테스트 실행

```bash
npm test
# or
yarn test
```

The test suite includes: / 테스트 스위트는 다음을 포함합니다:
- Basic rendering tests / 기본 렌더링 테스트
- Scroll event handling / 스크롤 이벤트 처리
- Loading state management / 로딩 상태 관리
- Threshold behavior / 임계값 동작
- Container-based scrolling / 컨테이너 기반 스크롤링
- Edge cases / 엣지 케이스

### Building / 빌드

```bash
npm run build
# or
yarn build
```

## Contributing / 기여하기

1. Fork the repository / 저장소를 포크합니다
2. Create your feature branch (`git checkout -b feature/amazing-feature`) / 기능 브랜치 생성
3. Commit your changes (`git commit -m 'Add some amazing feature'`) / 변경사항 커밋
4. Push to the branch (`git push origin feature/amazing-feature`) / 브랜치에 푸시
5. Open a Pull Request / 풀 리퀘스트 열기

## License / 라이선스

This project is licensed under the MIT License. / 이 프로젝트는 MIT 라이선스 하에 있습니다.

## Support / 지원

For support, please open an issue in the GitHub repository or contact the maintainers. / 지원을 위해서는 GitHub 저장소에 이슈를 열거나 관리자에게 문의하세요.