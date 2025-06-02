
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import { Zap, Download, Upload, Activity, Pause, Play } from "lucide-react";
import { useState, useEffect } from "react";

const SpeedTest = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [downloadPacketSize, setDownloadPacketSize] = useState("50");
  const [uploadPacketSize, setUploadPacketSize] = useState("15");
  const [progress, setProgress] = useState(0);
  
  const [results, setResults] = useState({
    download: 237.64,
    upload: 0,
    latency: 4.5,
    jitter: 2.88
  });

  const [downloadData, setDownloadData] = useState(
    Array.from({ length: 50 }, (_, i) => ({ x: i, y: Math.random() * 50 + 200 }))
  );
  
  const [latencyData, setLatencyData] = useState(
    Array.from({ length: 20 }, (_, i) => ({ x: i * 5, y: Math.random() * 8 + 2 }))
  );
  
  const [jitterData, setJitterData] = useState(
    Array.from({ length: 50 }, (_, i) => ({ x: i, y: Math.random() * 2 + 0.5 }))
  );

  const startSpeedTest = async () => {
    setIsRunning(true);
    setProgress(0);
    
    // Simulate speed test progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    // Simulate real-time data updates
    const dataInterval = setInterval(() => {
      if (!isRunning) {
        clearInterval(dataInterval);
        return;
      }
      
      setDownloadData(prev => [...prev.slice(1), { 
        x: prev.length, 
        y: Math.random() * 50 + 200 
      }]);
      
      setResults(prev => ({
        ...prev,
        download: Math.random() * 50 + 200,
        upload: Math.random() * 20 + 10,
        latency: Math.random() * 8 + 2,
        jitter: Math.random() * 2 + 0.5
      }));
    }, 200);

    setTimeout(() => {
      clearInterval(dataInterval);
      setIsRunning(false);
    }, 5000);
  };

  const stopSpeedTest = () => {
    setIsRunning(false);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="text-4xl">🚀</div>
          <h1 className="text-4xl font-bold text-white">Speed Test</h1>
        </div>
        <p className="text-gray-300 max-w-4xl mx-auto">
          Speed test will be done via Cloudflare's edge network, which may take a long time. 
          If your network is located in mainland China, the data may be biased. The speed test 
          results are for reference only, the actual speed will be faster. You can choose the 
          packet size for download and upload tests. By default, the speed test will perform 4 
          rounds of packet uploads and downloads, please be mindful of data usage.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-4 mb-8">
        <Select value={downloadPacketSize} onValueChange={setDownloadPacketSize}>
          <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="25">25 MB</SelectItem>
            <SelectItem value="50">50 MB</SelectItem>
            <SelectItem value="100">100 MB</SelectItem>
          </SelectContent>
        </Select>

        <Select value={uploadPacketSize} onValueChange={setUploadPacketSize}>
          <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10 MB</SelectItem>
            <SelectItem value="15">15 MB</SelectItem>
            <SelectItem value="25">25 MB</SelectItem>
          </SelectContent>
        </Select>

        <Button 
          onClick={isRunning ? stopSpeedTest : startSpeedTest}
          size="lg"
          className="bg-blue-500 hover:bg-blue-600 text-white px-8"
        >
          {isRunning ? (
            <>
              <Pause className="w-5 h-5 mr-2" />
              Stop Speed Test
            </>
          ) : (
            <>
              <Play className="w-5 h-5 mr-2" />
              Start/Pause Speed Test
            </>
          )}
        </Button>

        <div className="text-white text-sm">
          🇧🇷 Brazil 🌐 GRU, Brazil 🇧🇷
        </div>
      </div>

      {isRunning && (
        <div className="w-full max-w-2xl mx-auto">
          <Progress value={progress} className="h-4" />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-white/5 backdrop-blur-sm border border-white/10 text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-blue-400 flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Download
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-white mb-1">
              {results.download.toFixed(2)}
              <span className="text-lg text-gray-400">Mb/s</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-sm border border-white/10 text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-green-400 flex items-center justify-center gap-2">
              <Upload className="w-5 h-5" />
              Upload
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-white mb-1">
              {results.upload.toFixed(0)}
              <span className="text-lg text-gray-400">Mb/s</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-sm border border-white/10 text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-yellow-400 flex items-center justify-center gap-2">
              <Activity className="w-5 h-5" />
              Latency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-white mb-1">
              {results.latency.toFixed(1)}
              <span className="text-lg text-gray-400">ms</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-sm border border-white/10 text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-purple-400 flex items-center justify-center gap-2">
              <Zap className="w-5 h-5" />
              Jitter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-white mb-1">
              {results.jitter.toFixed(2)}
              <span className="text-lg text-gray-400">ms</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="bg-white/5 backdrop-blur-sm border border-white/10 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Download Speed</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={downloadData}>
                <XAxis hide />
                <YAxis hide />
                <Line 
                  type="monotone" 
                  dataKey="y" 
                  stroke="#06b6d4" 
                  strokeWidth={2}
                  fill="#06b6d4"
                  fillOpacity={0.3}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Latency</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <ScatterChart data={latencyData}>
                <XAxis hide />
                <YAxis hide />
                <Scatter dataKey="y" fill="#eab308" />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Jitter</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={jitterData}>
                <XAxis hide />
                <YAxis hide />
                <Line 
                  type="monotone" 
                  dataKey="y" 
                  stroke="#ec4899" 
                  strokeWidth={2}
                  dot={{ fill: '#ec4899', strokeWidth: 0, r: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SpeedTest;
