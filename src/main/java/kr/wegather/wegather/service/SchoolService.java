package kr.wegather.wegather.service;

import kr.wegather.wegather.domain.School;
import kr.wegather.wegather.repository.SchoolRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class SchoolService {
    private final SchoolRepository schoolRepository;

    /* School 조회 */
    // 복수 조회 - By Name
    public List<School> findByName(String name) {
        return schoolRepository.findByName(name);
    }
}
