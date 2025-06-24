import random


# Configurações
NUM_APOSTADORES = 100
TAXA_CASA = 0.05
TKN_POR_APOSTADOR = lambda: random.uniform(10, 100)  # TKN em stake por apostador
HYPE_APOSTA_FRACTION = 0.7  # Fração de HYPE usada para apostas

def simular_jogo():
    # Gerar hype aleatório para os times
    hype_A = random.uniform(0.5, 0.95)
    hype_B = 1 - hype_A
    hype_fixo = {'A': hype_A, 'B': hype_B}
    
    # Determinar favorito (maior hype)
    favorito = 'A' if hype_A > hype_B else 'B'
    odds = {
        'A': 1 / hype_fixo['A'],
        'B': 1 / hype_fixo['B']
    }
    
    # Simular apostadores
    apostadores = []
    total_TKN = 0
    apostas_A = 0
    apostas_B = 0
    
    for i in range(NUM_APOSTADORES):
        # Quantidade de TKN em stake
        TKN = TKN_POR_APOSTADOR()
        HYPE = TKN  # 1 TKN = 1 HYPE
        total_TKN += TKN
        
        # Decidir quanto apostar (aleatório, até HYPE_APOSTA_FRACTION)
        HYPE_apostado = HYPE * random.uniform(0.1, HYPE_APOSTA_FRACTION)
        
        # Decidir se aposta a favor ou contra o hype (70% de chance de apostar a favor)
        if random.random() < 0.7:
            time_apostado = favorito
        else:
            time_apostado = 'B' if favorito == 'A' else 'A'
        
        apostadores.append({
            'id': i,
            'TKN': TKN,
            'HYPE': HYPE,
            'HYPE_apostado': HYPE_apostado,
            'time_apostado': time_apostado,
            'ganho': 0,
            'retorno_pct': 0
        })
        
        if time_apostado == 'A':
            apostas_A += HYPE_apostado
        else:
            apostas_B += HYPE_apostado
    
    # Prize pool
    prize_pool = apostas_A + apostas_B
    lucro_casa = prize_pool * TAXA_CASA
    prize_pool_liquido = prize_pool * (1 - TAXA_CASA)
    
    # Simular resultado do jogo (50% de chance para cada time)
    vencedor = random.choice(['A', 'B'])
    
    # Distribuir ganhos e calcular retorno
    ganhos_totais = 0
    for apostador in apostadores:
        if apostador['time_apostado'] == vencedor:
            proporcao = apostador['HYPE_apostado'] * odds[apostador['time_apostado']]
            total_proporcao = apostas_A * odds['A'] if vencedor == 'A' else apostas_B * odds['B']
            ganho = proporcao * (prize_pool_liquido / total_proporcao) if total_proporcao > 0 else 0
            apostador['ganho'] = ganho
            apostador['retorno_pct'] = ((ganho - apostador['HYPE_apostado']) / apostador['HYPE_apostado']) * 100 if apostador['HYPE_apostado'] > 0 else 0
            ganhos_totais += ganho
        else:
            apostador['ganho'] = 0
            apostador['retorno_pct'] = -100  # Perda total
    
    return {
        'hype_A': hype_A,
        'hype_B': hype_B,
        'odds_A': odds['A'],
        'odds_B': odds['B'],
        'prize_pool': prize_pool,
        'prize_pool_A': apostas_A,
        'prize_pool_B': apostas_B,
        'lucro_casa': lucro_casa,
        'vencedor': vencedor,
        'apostadores': apostadores,
        'total_TKN': total_TKN,
        'ganhos_totais': ganhos_totais
    }

# Executar simulação
resultados = simular_jogo()

# Exibir resultados
print(f"Hype Time A: {resultados['hype_A']:.2f}, Hype Time B: {resultados['hype_B']:.2f}")
print(f"Odds Time A: {resultados['odds_A']:.2f}, Odds Time B: {resultados['odds_B']:.2f}")
print(f"Prize Pool Total: {resultados['prize_pool']:.2f} HYPE")
print(f"Prize Pool Time A: {resultados['prize_pool_A']:.2f} HYPE")
print(f"Prize Pool Time B: {resultados['prize_pool_B']:.2f} HYPE")
print(f"Lucro da Casa (5%): {resultados['lucro_casa']:.2f} HYPE")
print(f"Time Vencedor: {resultados['vencedor']}")
print(f"Total TKN em Stake: {resultados['total_TKN']:.2f}")
print(f"Total Ganhos Distribuídos: {resultados['ganhos_totais']:.2f} HYPE")
print("\nResultados por Apostador:")
for apostador in resultados['apostadores']:
    if (apostador['ganho'] == 0):
        continue
    print(f"Apostador {apostador['id']}: Apostou {apostador['HYPE_apostado']:.2f} HYPE no Time {apostador['time_apostado']}, "
          f"Ganho: {apostador['ganho']:.2f} HYPE, Retorno: {apostador['retorno_pct']:.2f}%")