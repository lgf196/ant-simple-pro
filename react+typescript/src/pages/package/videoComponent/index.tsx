import React, { useRef, useEffect, useState, memo } from 'react';
import PageLayout from '@/layouts/pageLayout';
import JoLPlayer, { callBackType, JoLPlayerRef, qualityKey } from 'jol-player';
import { Button, Input, Switch } from 'antd';
const Index = memo(function Index(props) {
  const videoRef = useRef<JoLPlayerRef>(null!);
  const [theme, setTheme] = useState<string>('#ffb821');
  const [isShowMultiple, setIsShowMultiple] = useState<boolean>(true);
  const onProgressMouseUp: callBackType = (val) => {
    console.log(`onProgressMouseUp`, val);
  };
  const onEndEd: callBackType = (val) => {
    console.log(`onEndEd`, val);
  };
  const onPause: callBackType = (val) => {
    console.log(`onPause`, val);
  };
  const onProgressMouseDown: callBackType = (val) => {
    console.log(`onProgressMouseDown`, val);
  };
  const onPlay: callBackType = (val) => {
    console.log(`onPlay`, val);
  };
  const onTimeChange: callBackType = (val) => {
    console.log(`onTimeChange`, val);
  };
  const onvolumechange: callBackType = (val) => {
    console.log(`onvolumechange`, val);
  };
  const onError = () => {
    console.log(`onError`);
  };
  const onQualityChange: callBackType<qualityKey> = (val) => {
    console.log(`onQualityChange`, val);
  };
  useEffect(() => {
    console.log(`videoRef.current`, videoRef.current);
  }, [videoRef.current]);

  const videoMethod = (status: string) => {
    if (status === 'play') {
      videoRef.current.play();
    } else if (status === 'pause') {
      videoRef.current.pause();
    } else if (status === 'load') {
      videoRef.current.load();
    } else if (status === 'volume') {
      videoRef.current.setVolume(86);
    } else if (status === 'seek') {
      videoRef.current.seek(500);
    }
  };
  const toggle = () => {
    videoRef.current.setVideoSrc(
      'https://gs-files.oss-cn-hongkong.aliyuncs.com/okr/test/file/2021/07/01/haiwang.mp4',
    );
  };
  // There are many properties and methods, please refer to the documentation ...
  return (
    <PageLayout>
      <JoLPlayer
        ref={videoRef}
        onProgressMouseUp={onProgressMouseUp}
        onEndEd={onEndEd}
        onPause={onPause}
        onProgressMouseDown={onProgressMouseDown}
        onPlay={onPlay}
        onTimeChange={onTimeChange}
        onvolumechange={onvolumechange}
        onError={onError}
        onQualityChange={onQualityChange}
        option={{
          videoSrc:
            'https://gs-files.oss-cn-hongkong.aliyuncs.com/okr/prod/file/2021/08/31/540p.mp4',
          width: 750,
          height: 420,
          theme,
          poster:
            'https://gs-files.oss-cn-hongkong.aliyuncs.com/okr/prod/file/2021/08/31/1080pp.png',
          language: 'en',
          isShowMultiple,
          pausePlacement: 'center',
          quality: [
            {
              name: 'FHD',
              url: 'https://gs-files.oss-cn-hongkong.aliyuncs.com/okr/prod/file/2021/08/31/720p.mp4',
            },
            {
              name: 'HD',
              url: 'https://gs-files.oss-cn-hongkong.aliyuncs.com/okr/prod/file/2021/08/31/540p.mp4',
            },
            {
              name: 'SD',
              url: 'https://gs-files.oss-accelerate.aliyuncs.com/okr/prod/file/2021/08/31/1630377480138360p.mp4',
            },
          ],
        }}
      />
      <div style={{ margin: '20px 0', width: '200px' }}>
        <div style={{ display: 'flex' }}>
          <p style={{ flex: 2 }}>them：</p>
          <Input type="color" style={{ flex: 2 }} onChange={(val) => setTheme(val.target.value)} />
        </div>
        <div style={{ display: 'flex', margin: '10px 0' }}>
          <p style={{ flex: 2 }}>multiple：</p>
          <Switch
            style={{ flex: 2 }}
            checkedChildren="show"
            unCheckedChildren="hiddle"
            defaultChecked
            onChange={(val) => setIsShowMultiple(val)}
          />
        </div>
      </div>
      <Button onClick={() => videoMethod('play')}>play</Button>
      <Button onClick={() => videoMethod('pause')}>pause</Button>
      <Button onClick={() => videoMethod('load')}>load</Button>
      <Button onClick={() => videoMethod('volume')}>volume(80)</Button>
      <Button onClick={() => videoMethod('seek')}>seek(500s)</Button>
      <Button onClick={toggle}>switch Road King</Button>
      <p style={{ padding: '10px 0', color: 'red' }}>
        There are many properties and methods, please refer to the documentation ...
      </p>
    </PageLayout>
  );
});

export default Index;
