
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, MapPin, Globe, Shield } from "lucide-react";
import { useState } from "react";

interface DNSTest {
  id: number;
  endpoint: string;
  isp: string;
  region: string;
}

const DNSLeakTest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tests] = useState<DNSTest[]>([
    {
      id: 1,
      endpoint: '172.217.35.20',
      isp: 'Google LLC',
      region: 'Brazil 🇧🇷'
    },
    {
      id: 2,
      endpoint: '172.69.10.90',
      isp: 'Cloudflare, Inc.',
      region: 'Brazil 🇧🇷'
    },
    {
      id: 3,
      endpoint: '172.253.233.20',
      isp: 'Google LLC',
      region: 'Brazil 🇧🇷'
    },
    {
      id: 4,
      endpoint: '172.69.10.212',
      isp: 'CloudFlare Inc.',
      region: 'Brazil 🇧🇷'
    }
  ]);

  const runTest = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsLoading(false);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Shield className="w-12 h-12 text-gray-300" strokeWidth={1} />
          <h1 className="text-4xl font-bold text-white">DNS Leak Test</h1>
          <Button 
            onClick={runTest}
            disabled={isLoading}
            size="sm"
            variant="ghost"
            className="text-white hover:bg-white/10"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} strokeWidth={1} />
          </Button>
        </div>
        <div className="text-gray-300 max-w-4xl mx-auto space-y-4">
          <p>
            A DNS leak means that when you are connected to a VPN/proxy, your domain name resolutions 
            are still done through your local ISP, thus posing a risk of DNS leaks.
          </p>
          <p>
            The method to test for DNS leaks involves accessing a newly generated domain name to detect 
            which regional DNS exit you are resolving through. If the endpoint region returned matches 
            your local service provider's region, there is a risk of DNS leakage. In this case, you may 
            need to modify your VPN/proxy settings.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tests.map((test) => (
          <Card key={test.id} className="bg-white/5 backdrop-blur-sm border border-white/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-3">
                <div className="text-2xl">🌐</div>
                Test {test.id}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-green-400">
                DNS Endpoint: {test.endpoint}
              </div>
              
              <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg space-y-2">
                <div className="flex items-center gap-2 text-green-300">
                  <Globe className="w-4 h-4 text-gray-300" strokeWidth={1} />
                  <span className="text-sm">ISP: {test.isp}</span>
                </div>
                <div className="flex items-center gap-2 text-green-300">
                  <MapPin className="w-4 h-4 text-gray-300" strokeWidth={1} />
                  <span className="text-sm">Region: {test.region}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DNSLeakTest;
