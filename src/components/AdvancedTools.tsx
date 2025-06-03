
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Activity, Shield, Search, Network, Eye, Lock } from "lucide-react";

interface AdvancedTool {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const AdvancedTools = () => {
  const tools: AdvancedTool[] = [
    {
      title: "Global Latency Test",
      description: "Global Ping value test",
      icon: <Activity className="w-6 h-6" strokeWidth={1} />
    },
    {
      title: "MTR Test",
      description: "Global MTR route test",
      icon: <Network className="w-6 h-6" strokeWidth={1} />
    },
    {
      title: "Rule Test",
      description: "Check the rule settings of proxy software",
      icon: <Shield className="w-6 h-6" strokeWidth={1} />
    },
    {
      title: "DNS Resolution",
      description: "Real-time multi-channel DNS resolution",
      icon: <Globe className="w-6 h-6" strokeWidth={1} />
    },
    {
      title: "Censorship Check",
      description: "Check if a website is blocked in some countries",
      icon: <Lock className="w-6 h-6" strokeWidth={1} />
    },
    {
      title: "Whois Search",
      description: "Search for domain/IP registration information",
      icon: <Search className="w-6 h-6" strokeWidth={1} />
    },
    {
      title: "MAC Lookup",
      description: "Query information of a physical address",
      icon: <Network className="w-6 h-6" strokeWidth={1} />
    },
    {
      title: "Browser Information",
      description: "Check browser information and fingerprint",
      icon: <Globe className="w-6 h-6" strokeWidth={1} />
    },
    {
      title: "Security Checklist",
      description: "Guide to securing your digital life",
      icon: <Shield className="w-6 h-6" strokeWidth={1} />
    },
    {
      title: "Invisibility Test",
      description: "Check if you are using a proxy or VPN",
      icon: <Eye className="w-6 h-6" strokeWidth={1} />
    }
  ];

  const handleToolClick = (toolTitle: string) => {
    console.log(`Opening tool: ${toolTitle}`);
    // Here you would implement the specific tool functionality
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="text-4xl">⚙️</div>
          <h1 className="text-4xl font-bold text-white">Advanced Tools</h1>
        </div>
        <p className="text-gray-300 max-w-4xl mx-auto">
          Tools that are used relatively infrequently, but are very useful when performing network testing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tools.map((tool, index) => (
          <Card 
            key={index} 
            className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
            onClick={() => handleToolClick(tool.title)}
          >
            <CardHeader className="text-center">
              <div className="text-gray-300 group-hover:text-white group-hover:scale-110 transition-all duration-300 flex justify-center mb-3">
                {tool.icon}
              </div>
              <CardTitle className="text-white text-lg group-hover:text-blue-300 transition-colors">
                {tool.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-400 text-sm">
                {tool.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdvancedTools;
