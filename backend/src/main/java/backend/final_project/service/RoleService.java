package backend.final_project.service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import backend.final_project.entity.enums.Role;

@Service
public class RoleService {
    public List<Role> getSelectableRoles(){
        return Arrays.stream(Role.values())
                .collect(Collectors.toList());
    }
}