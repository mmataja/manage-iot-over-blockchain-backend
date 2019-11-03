pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract ManageDevice {
    address owner;
    
    struct Device {
        uint id;
        string signature;
        string url;
        string publicKey;
    }
    
    mapping(uint => Device) devices;
    uint deviceCount;
    
    constructor() public{
        owner = msg.sender;
        deviceCount = 0;
    }
    
    modifier onlyOwner() {
        require (msg.sender == owner, "Sender is not contract owner.");
        _;
    }
    
    event DeviceRegister(address owner, uint blockNumber, address contractAddress);
    
    function registerDevice(string memory _signature, string memory _url, string memory _publicKey) onlyOwner public {
        devices[deviceCount] = Device(deviceCount, _signature, _url, _publicKey);
        deviceCount++;
        emit DeviceRegister(owner, block.number, address(this));
    }
    
    function getDevice(uint _id) public view returns (Device memory) {
        return devices[_id];
    }
    
    function getDevices() public view returns (Device[] memory) {
        Device[] memory id = new Device[](deviceCount);
        for (uint i = 0; i < deviceCount; i++) {
            Device storage device = devices[i];
            id[i] = device;
        }
        return id;
    }
}