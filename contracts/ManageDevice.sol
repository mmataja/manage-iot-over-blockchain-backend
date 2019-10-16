pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract ManageDevice {
    address owner;

    struct Device {
        uint id;
        string signature;
    }

    mapping(uint => Device) public devices;
    uint public deviceCount;

    constructor() public{
        owner = msg.sender;
        deviceCount = 0;
    }
    
    function registerDevice(string memory _signature) public {
        devices[deviceCount] = Device(deviceCount, _signature);
        deviceCount++;
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