import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface BackendTabProps {
  hypeId: string;
  onHypeIdChange: (value: string) => void;
}

export default function BackendTab({ hypeId, onHypeIdChange }: BackendTabProps) {
  // States para cada endpoint
  const [localHypeId, setLocalHypeId] = useState(hypeId);
  const [hypeResult, setHypeResult] = useState<any>(null);
  const [seriesResult, setSeriesResult] = useState<any>(null);
  const [collectResult, setCollectResult] = useState<any>(null);
  const [manualText, setManualText] = useState("");
  const [manualResult, setManualResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sincronizar localHypeId com prop
  useEffect(() => {
    setLocalHypeId(hypeId);
  }, [hypeId]);

  // Helper para baseURL
  const baseURL = typeof window !== "undefined" ? (window.location.hostname === "localhost" ? "http://localhost:4000" : "") : "";

  // Funções para cada endpoint
  const fetchHype = async () => {
    setLoading(true); setError(null);
    try {
      const res = await fetch(`${baseURL}/hype/${localHypeId}`);
      setHypeResult(await res.json());
    } catch (e: any) {
      setError(e.message);
    } finally { setLoading(false); }
  };
  const fetchSeries = async () => {
    setLoading(true); setError(null);
    try {
      const res = await fetch(`${baseURL}/hype/series/${localHypeId}`);
      setSeriesResult(await res.json());
    } catch (e: any) {
      setError(e.message);
    } finally { setLoading(false); }
  };
  const fetchCollect = async () => {
    setLoading(true); setError(null);
    try {
      const res = await fetch(`${baseURL}/collect-posts/${localHypeId}`);
      setCollectResult(await res.json());
    } catch (e: any) {
      setError(e.message);
    } finally { setLoading(false); }
  };
  const postManual = async () => {
    setLoading(true); setError(null);
    try {
      const res = await fetch(`${baseURL}/add-post/${localHypeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: manualText })
      });
      setManualResult(await res.json());
    } catch (e: any) {
      setError(e.message);
    } finally { setLoading(false); }
  };

  // Quando usuário digita, atualizar local e prop
  const handleHypeIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalHypeId(e.target.value);
    onHypeIdChange(e.target.value);
  };

  return (
    <div className="space-y-8 p-4">
      <h2 className="text-2xl font-bold mb-4">Testes do Backend</h2>
      <div className="space-y-4">
        <Input
          placeholder="hype-id"
          value={localHypeId}
          onChange={handleHypeIdChange}
          className="max-w-xs"
        />
        <div className="flex gap-2 flex-wrap">
          <Button onClick={fetchHype} disabled={loading || !localHypeId}>GET /hype/:hype-id</Button>
          <Button onClick={fetchSeries} disabled={loading || !localHypeId}>GET /hype/series/:hype-id</Button>
          <Button onClick={fetchCollect} disabled={loading || !localHypeId}>GET /collect-posts/:hype-id</Button>
        </div>
        <div>
          <Textarea
            placeholder="Texto para análise de sentimento (POST /add-post/:hype-id)"
            value={manualText}
            onChange={e => setManualText(e.target.value)}
            className="max-w-lg"
          />
          <Button onClick={postManual} disabled={loading || !localHypeId || !manualText} className="mt-2">POST /add-post/:hype-id</Button>
        </div>
        {error && <div className="text-red-500">Erro: {error}</div>}
        <div className="mt-4">
          {hypeResult && <pre className="bg-gray-100 p-2 rounded mb-2">/hype/:hype-id\n{JSON.stringify(hypeResult, null, 2)}</pre>}
          {seriesResult && <pre className="bg-gray-100 p-2 rounded mb-2">/hype/series/:hype-id\n{JSON.stringify(seriesResult, null, 2)}</pre>}
          {collectResult && <pre className="bg-gray-100 p-2 rounded mb-2">/collect-posts/:hype-id\n{JSON.stringify(collectResult, null, 2)}</pre>}
          {manualResult && <pre className="bg-gray-100 p-2 rounded mb-2">/add-post/:hype-id\n{JSON.stringify(manualResult, null, 2)}</pre>}
        </div>
      </div>
    </div>
  );
} 