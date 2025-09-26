import { useMemo, useEffect } from "react";
import type { Player } from "../game";
import ReactFlow, { 
  Background, 
  Controls, 
  type NodeProps, 
  ReactFlowProvider,
  useReactFlow 
} from "reactflow";

function PlayerNode({ data }: NodeProps<{ name: string; photo: string }>) {
  return (
    <div className="flex flex-col items-center group">
      <div className="relative">
        <img
          src={data.photo}
          alt={data.name}
          className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover transition-transform duration-200 group-hover:scale-110"
        />
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
      </div>
      <p className="text-sm font-medium mt-2 text-gray-700 bg-white/80 px-2 py-1 rounded-full shadow-sm max-w-24 text-center truncate">
        {data.name}
      </p>
    </div>
  );
}

function GuessGraphInner({ correctGuesses }: {correctGuesses: Player[]}) {
  const { fitView } = useReactFlow();

  // Build nodes + edges from guesses
  const { nodes, edges } = useMemo(() => {
    console.log('correctGuesses:', correctGuesses);
    
    if (!correctGuesses || correctGuesses.length === 0) {
      return { nodes: [], edges: [] };
    }

    const nodeSpacing = 250;
    const centerY = 100;
    
    const nodes = correctGuesses.map((p: Player, i: number) => ({
      id: `player-${i}`,
      type: "player",
      position: { x: i * nodeSpacing + 100, y: centerY },
      data: { name: p.name, photo: p.photo },
    }));
    
    console.log('Generated nodes:', nodes);

    const edges = correctGuesses
      .slice(0, -1)
      .map((_: Player, i: number) => ({
        id: `edge-${i}-${i + 1}`,
        source: `player-${i}`,
        target: `player-${i + 1}`,
        type: 'smoothstep',
        animated: true,
        style: {
          stroke: '#3b82f6',
          strokeWidth: 3,
          strokeDasharray: '5,5',
        },
      }));

    return { nodes, edges };
  }, [correctGuesses]);

  // Force fitView when nodes change
  useEffect(() => {
    if (nodes.length > 0) {
      setTimeout(() => {
        fitView({ 
          padding: 0.2, 
          duration: 800,
          includeHiddenNodes: false,
          minZoom: 0.1,
          maxZoom: 1
        });
      }, 200);
    }
  }, [nodes, fitView]);

  if (correctGuesses.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        No correct guesses yet
      </div>
    );
  }

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={{ player: PlayerNode }}
      fitView
      fitViewOptions={{ padding: 0.2, duration: 800 }}
      proOptions={{ hideAttribution: true }}
      minZoom={0.1}
      maxZoom={1.5}
      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable={false}
      defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
    >
      <Background 
        color="#e5e7eb" 
        gap={20} 
        size={1}
      />
      <Controls 
        showInteractive={false}
        position="bottom-right"
      />
    </ReactFlow>
  );
}

export default function GuessGraph({ correctGuesses }: {correctGuesses: Player[]}) {
  return (
    <div className="w-full h-96 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl border border-gray-200 shadow-inner">
      <ReactFlowProvider>
        <GuessGraphInner correctGuesses={correctGuesses} />
      </ReactFlowProvider>
    </div>
  );
}