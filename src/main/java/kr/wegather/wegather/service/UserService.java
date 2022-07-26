package kr.wegather.wegather.service;

import kr.wegather.wegather.domain.User;
import kr.wegather.wegather.exception.UserException;
import kr.wegather.wegather.exception.UserExceptionType;
import kr.wegather.wegather.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
@DynamicInsert
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    /* User 조회 */
    // 단건 조회 - By Id
    public User findOne(Long id) {
        return userRepository.findOne(id);
    }

    /* User 생성 */
    // 회원가입
    public Long signUp(User user) {
        String email = user.getEmail();
        validateDuplicateUser(email); // 중복 회원 검증

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Long userId = userRepository.save(user);

        return userId;
    }

    /* User 수정 */
    // Minor Info 수정
    public void updateUser(Long id, String nickname, String avatar, String profile, String phone) {
        User user;
        try {
            user = userRepository.findOne(id);
        } catch (Exception e) {
            throw new UserException(UserExceptionType.USER_NOT_FOUND);
        }

        user.setNickname(nickname);
        user.setAvatar(avatar);
        user.setProfile(profile);
        user.setPhone(phone);
    }
    // Password 수정

    public void changePassword(Long id, String password, String newPassword) {
        User user = userRepository.findOne(id);
        if (user == null)
            throw new UserException(UserExceptionType.USER_NOT_FOUND);

        BCryptPasswordEncoder Bcrypt = new BCryptPasswordEncoder();
        if (!Bcrypt.matches(password, user.getPassword()))
            throw new UserException(UserExceptionType.WRONG_INPUT);

        // 비밀번호 암호화
        user.setPassword(Bcrypt.encode(newPassword));
    }
    // Email 수정 - 이메일 인증 로직 추가

    public void changeEmail(Long id, String email) {
        User user;
        try {
            user = userRepository.findOne(id);
        } catch (Exception e) {
            throw new UserException(UserExceptionType.USER_NOT_FOUND);
        }

        user.setEmail(email);
    }
    /* User 삭제 */

    public void delete(Long id) {
        User user;
        try {
            user = userRepository.findOne(id);
        } catch (Exception e) {
            throw new UserException(UserExceptionType.USER_NOT_FOUND);
        }
        user.setIsDeleted(true);
    }
    // 중복 검사

    private void validateDuplicateUser(String email) {
        // 파라미터 검사
        try {
            User user = userRepository.findOneByEmail(email);
        } catch (Exception e) {
            return;
        }
        throw new UserException(UserExceptionType.ALREADY_EXIST);
    }
}
