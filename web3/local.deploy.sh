export CHAIN_ID=31337

forge script script/Deploy.s.sol:DeployScript --rpc-url http://localhost:8545 --build-info --account ff80 --broadcast

python3 deploy.py