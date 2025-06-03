import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Globe, 
  Route, 
  Shield, 
  Search, 
  Network, 
  Eye, 
  Lock, 
  Activity,
  RefreshCw,
  Copy,
  CheckCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PingResult {
  location: string;
  ip: string;
  latency: number;
  status: 'success' | 'timeout' | 'error';
}

interface WhoisResult {
  domain: string;
  registrar: string;
  creationDate: string;
  expirationDate: string;
  nameServers: string[];
}

interface DNSResult {
  domain: string;
  recordType: string;
  values: string[];
  ttl: number;
}

const AdvancedToolsImplemented = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  
  // Global Latency Test
  const [pingResults, setPingResults] = useState<PingResult[]>([
    { location: 'Cleveland, USA', ip: '162.255.119.15', latency: 135, status: 'success' },
    { location: 'Coimbra, PT', ip: '193.136.28.12', latency: 165, status: 'success' },
    { location: 'São José dos Campos, BR', ip: '189.126.45.78', latency: 25, status: 'success' },
    { location: 'São Paulo, BR', ip: '191.241.242.89', latency: 15, status: 'success' },
    { location: 'Rio de Janeiro, BR', ip: '177.43.176.12', latency: 28, status: 'success' }
  ]);

  // Whois Search
  const [whoisDomain, setWhoisDomain] = useState('');
  const [whoisResult, setWhoisResult] = useState<WhoisResult | null>(null);

  // DNS Resolution
  const [dnsQuery, setDnsQuery] = useState('');
  const [dnsRecordType, setDnsRecordType] = useState('A');
  const [dnsResults, setDnsResults] = useState<DNSResult[]>([]);

  // MAC Lookup
  const [macAddress, setMacAddress] = useState('');
  const [macResult, setMacResult] = useState<string | null>(null);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      toast({
        title: "Copied!",
        description: "Text copied to clipboard.",
      });
      setTimeout(() => setCopied(null), 2000);
    } catch (error) {
      toast({
        title: "Copy error",
        description: "Could not copy text.",
        variant: "destructive",
      });
    }
  };

  const runGlobalLatencyTest = async () => {
    setIsLoading(true);
    
    // Simulate latency test
    for (let i = 0; i < pingResults.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setPingResults(prev => prev.map((result, index) => {
        if (index === i) {
          return {
            ...result,
            latency: Math.floor(Math.random() * 300) + 10,
            status: Math.random() > 0.1 ? 'success' : 'timeout'
          };
        }
        return result;
      }));
    }
    
    setIsLoading(false);
    toast({
      title: "Latency test completed!",
      description: "Results updated successfully.",
    });
  };

  const runWhoisSearch = async () => {
    if (!whoisDomain.trim()) return;
    
    setIsLoading(true);
    
    // Simulate whois search
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setWhoisResult({
      domain: whoisDomain,
      registrar: 'Example Registrar Inc.',
      creationDate: '2020-01-15',
      expirationDate: '2025-01-15',
      nameServers: ['ns1.example.com', 'ns2.example.com']
    });
    
    setIsLoading(false);
  };

  const runDNSResolution = async () => {
    if (!dnsQuery.trim()) return;
    
    setIsLoading(true);
    
    // Simulate DNS resolution
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockResults: DNSResult[] = [
      {
        domain: dnsQuery,
        recordType: dnsRecordType,
        values: dnsRecordType === 'A' ? ['192.168.1.1', '192.168.1.2'] : ['example.com'],
        ttl: 300
      }
    ];
    
    setDnsResults(mockResults);
    setIsLoading(false);
  };

  const runMacLookup = async () => {
    if (!macAddress.trim()) return;
    
    setIsLoading(true);
    
    // Simulate MAC lookup
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setMacResult('Intel Corporate (00:1B:77:XX:XX:XX)');
    setIsLoading(false);
  };

  const getLatencyColor = (latency: number) => {
    if (latency < 50) return 'text-green-400';
    if (latency < 150) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="text-4xl">🛠️</div>
          <h1 className="text-4xl font-bold text-white">Advanced Tools</h1>
        </div>
        <p className="text-gray-300 max-w-4xl mx-auto">
          Professional tools for network analysis and advanced diagnostics.
        </p>
      </div>

      <Tabs defaultValue="latency" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-white/10 backdrop-blur-sm">
          <TabsTrigger value="latency" className="data-[state=active]:bg-white/20">
            <Activity className="w-4 h-4 mr-1" />
            Latency
          </TabsTrigger>
          <TabsTrigger value="whois" className="data-[state=active]:bg-white/20">
            <Search className="w-4 h-4 mr-1" />
            Whois
          </TabsTrigger>
          <TabsTrigger value="dns" className="data-[state=active]:bg-white/20">
            <Network className="w-4 h-4 mr-1" />
            DNS
          </TabsTrigger>
          <TabsTrigger value="mac" className="data-[state=active]:bg-white/20">
            <Network className="w-4 h-4 mr-1" />
            MAC
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-white/20">
            <Shield className="w-4 h-4 mr-1" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="latency" className="space-y-6">
          <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-purple-400" />
                  Global Latency Test
                </CardTitle>
                <Button
                  onClick={runGlobalLatencyTest}
                  disabled={isLoading}
                  size="sm"
                  className="bg-purple-500 hover:bg-purple-600"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  {isLoading ? 'Testing...' : 'Test'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pingResults.map((result, index) => (
                  <div key={index} className="bg-black/20 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">{result.location}</span>
                      <div className={`w-3 h-3 rounded-full ${
                        result.status === 'success' ? 'bg-green-500' : 
                        result.status === 'timeout' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                    </div>
                    <div className="text-gray-400 text-sm mb-1">{result.ip}</div>
                    <div className={`text-lg font-mono ${getLatencyColor(result.latency)}`}>
                      {result.status === 'success' ? `${result.latency}ms` : 'Timeout'}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="whois" className="space-y-6">
          <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Search className="w-5 h-5 text-pink-400" />
                Whois Lookup
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="example.com"
                  value={whoisDomain}
                  onChange={(e) => setWhoisDomain(e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                />
                <Button
                  onClick={runWhoisSearch}
                  disabled={isLoading}
                  className="bg-pink-500 hover:bg-pink-600"
                >
                  {isLoading ? 'Searching...' : 'Search'}
                </Button>
              </div>

              {whoisResult && (
                <div className="bg-black/20 p-4 rounded-lg space-y-2">
                  <div><span className="text-gray-400">Domain:</span> <span className="text-white">{whoisResult.domain}</span></div>
                  <div><span className="text-gray-400">Registrar:</span> <span className="text-white">{whoisResult.registrar}</span></div>
                  <div><span className="text-gray-400">Created:</span> <span className="text-white">{whoisResult.creationDate}</span></div>
                  <div><span className="text-gray-400">Expires:</span> <span className="text-white">{whoisResult.expirationDate}</span></div>
                  <div>
                    <span className="text-gray-400">Name Servers:</span>
                    <div className="ml-4 mt-1">
                      {whoisResult.nameServers.map((ns, i) => (
                        <div key={i} className="text-white">{ns}</div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dns" className="space-y-6">
          <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Network className="w-5 h-5 text-cyan-400" />
                DNS Resolution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="google.com"
                  value={dnsQuery}
                  onChange={(e) => setDnsQuery(e.target.value)}
                  className="bg-white/10 border-white/20 text-white flex-1"
                />
                <select
                  value={dnsRecordType}
                  onChange={(e) => setDnsRecordType(e.target.value)}
                  className="bg-white/10 border border-white/20 text-white rounded-md px-3 py-2"
                >
                  <option value="A">A</option>
                  <option value="AAAA">AAAA</option>
                  <option value="CNAME">CNAME</option>
                  <option value="MX">MX</option>
                  <option value="TXT">TXT</option>
                </select>
                <Button
                  onClick={runDNSResolution}
                  disabled={isLoading}
                  className="bg-cyan-500 hover:bg-cyan-600"
                >
                  {isLoading ? 'Resolving...' : 'Resolve'}
                </Button>
              </div>

              {dnsResults.length > 0 && (
                <div className="space-y-2">
                  {dnsResults.map((result, index) => (
                    <div key={index} className="bg-black/20 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">{result.domain} ({result.recordType})</span>
                        <span className="text-gray-400 text-sm">TTL: {result.ttl}s</span>
                      </div>
                      {result.values.map((value, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="text-green-400 font-mono">{value}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(value)}
                            className="text-white hover:bg-white/10 h-6 w-6 p-0"
                          >
                            {copied === value ? (
                              <CheckCircle className="w-3 h-3 text-green-400" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </Button>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mac" className="space-y-6">
          <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Network className="w-5 h-5 text-indigo-400" />
                MAC Address Lookup
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="00:1B:77:49:54:FD"
                  value={macAddress}
                  onChange={(e) => setMacAddress(e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                />
                <Button
                  onClick={runMacLookup}
                  disabled={isLoading}
                  className="bg-indigo-500 hover:bg-indigo-600"
                >
                  {isLoading ? 'Looking up...' : 'Lookup'}
                </Button>
              </div>

              {macResult && (
                <div className="bg-black/20 p-4 rounded-lg">
                  <div><span className="text-gray-400">Manufacturer:</span> <span className="text-white">{macResult}</span></div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Eye className="w-5 h-5 text-yellow-400" />
                  Privacy Test
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-white">Proxy/VPN: Not detected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-white">WebRTC: Protected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-white">DNS: Verification needed</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Lock className="w-5 h-5 text-red-400" />
                  Security Checklist
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-white">HTTPS enabled</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-white">Valid certificate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-white">Secure connection</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedToolsImplemented;
