"""
Automation for update debug section in front-end
"""

from dataclasses import dataclass, field
from json import dumps, load
from typing import List
import json
import glob
import os
import sys


@dataclass
class Contract:
    """
    # Contract must have:
    - contractAddress: str
    - contractName: str
    - abi: list
    """

    name: str
    address: str
    abi: list = field(default_factory=list)


CHAIN_ID = int(os.getenv('CHAIN_ID'))
CONTRACT_SCRIPT_NAME = "Deploy.s.sol"
TRANSACTIONS_PATH = f"broadcast/{CONTRACT_SCRIPT_NAME}/{CHAIN_ID}/run-latest.json"
TARGET_DIR_FRONTEND = "../front-end/lib/deployedContracts.ts"
TARGET_DIR_BACKEND = "../back-end/src/lib/deployedContracts.ts"

CONTRACTS = []



def abi_path(name) -> str:
    return f"out/{name}.sol/{name}.json"


def print_step(message):
    print(f"\n\033[1;34m>>> {message}\033[0m")


def print_success(message):
    print(f"\033[1;32m✓ {message}\033[0m")


def print_warning(message):
    print(f"\033[1;33m! {message}\033[0m")


def print_error(message):
    print(f"\033[1;31m✗ {message}\033[0m")



def generate_typescript_for_frontend(contracts):
    print_step("Gerando arquivo TypeScript para Microservices")
    json_data = dumps(
        {
            contract.name: {"address": contract.address, "abi": contract.abi}
            for contract in contracts
        },
        indent=4,
    )

    typescript_content_agent = f"""
const deployedContracts = {json_data} as const;

export default deployedContracts;
        """

    with open(TARGET_DIR_FRONTEND, "w") as ts_file:
        ts_file.write(typescript_content_agent)
    print_success(f"Arquivo de contratos atualizado em {TARGET_DIR_FRONTEND}")


def generate_typescript_for_backend(contracts):
    print_step("Gerando arquivo TypeScript para Microservices")
    json_data = dumps(
        {
            contract.name: {"address": contract.address, "abi": contract.abi}
            for contract in contracts
        },
        indent=4,
    )

    typescript_content_agent = f"""
const deployedContracts = {json_data} as const;

export default deployedContracts;
        """

    with open(TARGET_DIR_BACKEND, "w") as ts_file:
        ts_file.write(typescript_content_agent)
    print_success(f"Arquivo de contratos atualizado em {TARGET_DIR_BACKEND}")

def updateABI():
    print_step("Iniciando atualização de ABIs e endereços")

    print("Lendo transações do arquivo de broadcast...")
    if not os.path.exists(TRANSACTIONS_PATH):
        print_error(f"Arquivo de transações não encontrado: {TRANSACTIONS_PATH}")
        sys.exit(1)
    with open(TRANSACTIONS_PATH) as deployed_contracts:
        json_file = load(deployed_contracts)
        transactions = json_file["transactions"]
        contracts: List[Contract] = []

        print(f"Encontradas {len(transactions)} transações")

        for contract in transactions:
            if contract["transactionType"] == "CREATE":
                name, address = contract["contractName"], contract["contractAddress"]
                print(f"Processando contrato: {name} ({address})")
                CONTRACTS.append(name)

                abi_file_path = abi_path(name)
                print(f"Lendo ABI de {abi_file_path}")

                with open(abi_file_path) as full_abi_json:
                    abi = load(full_abi_json)["abi"]
                    contracts.append(Contract(name, address, abi))
                    print_success(f"ABI de {name} carregada com sucesso")
                    
    generate_typescript_for_frontend(contracts)
    generate_typescript_for_backend(contracts)




print_step("Iniciando processo de atualização de contratos")
updateABI()
print_success("Processo concluído com sucesso!")